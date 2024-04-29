import EntryData from '../models/entrydata.js';
import { isAuth } from '../controllers/auth.js';
import MonthEntryData from '../models/monthdataentry.js';
import WordEntryData from '../models/worddata.js';

import dotenv from 'dotenv';
dotenv.config();

function extractDateFromText(text) {
    const dateRegex = /\b(?:jan(?:uary)?|feb(?:ruary)?|mar(?:ch)?|apr(?:il)?|may|jun(?:e)?|jul(?:y)?|aug(?:ust)?|sep(?:tember)?|oct(?:ober)?|nov(?:ember)?|dec(?:ember)?)\s(\d{1,2}),?\s(\d{4})/i;

    const match = text.match(dateRegex);

    if (match) {
        const fullDate = match[0]; // Get the full date string
        const dateObj = new Date(fullDate);
        
        // Extract individual components
        const month = String(dateObj.getMonth() + 1).padStart(2, '0');
        const day = String(dateObj.getDate()).padStart(2, '0');
        const year = dateObj.getFullYear();

        const formattedDate = `${year}-${month}-${day}`;
        console.log('Formatted Date:', formattedDate);
        return formattedDate;
    }

    console.log('No date found');
    return null;
}

async function findInsertionIndex(newDate) {
    const existingEntries = await EntryData.findAll({
        order: [['date', 'ASC']],
      });
    
      // Insert the new entry at the correct position (within the existingEntries array)
      const insertionIndex = existingEntries.findIndex((entry) => newDate < entry.date);
      existingEntries.splice(insertionIndex, 0, {EntryData, date: newDate });
    
      return existingEntries;
}

async function insertEntry(entryData, insertionIndex) {
    try {
        // Fetch the previous entry (if any)
        const previousEntry = await EntryData.findOne({
            order: [['date', 'DESC']], // Get the most recent entry before the new one
        });

        // Calculate days difference (considering null for the first entry)
        let daysd = 0;
        if (previousEntry) {
            const extractedDate = new Date(entryData.date);
            const prevDate = new Date(previousEntry.date);
            const diffInMs = extractedDate - prevDate;
            daysd = Math.round(diffInMs / (1000 * 60 * 60 * 24));
        }

        // Update entryData with calculated daysDiff
        entryData.daysdiff = daysd;

        // Insert the new entry with daysDiff
        const insertedEntry = await EntryData.create(entryData, { position: insertionIndex });
        console.log('Entry inserted successfully!');
        return insertedEntry.id; // Return the id of the inserted entry
    } catch (err) {
        console.log(err);
        return null;
    }
}


async function updateMonthData(date, increment) {
    try {
        // Find the month entry for the given date
        const monthEntry = await MonthEntryData.findOne({ where: { Month: date.substring(0, 7) } });

        if (monthEntry) {
            // If month entry exists, update the injuries count
            await monthEntry.update({ injuries: monthEntry.injuries + increment });
        } else {
            // If month entry doesn't exist, create a new one
            await MonthEntryData.create({
                Month: date.substring(0, 7),
                injuries: increment
            });
        }

        console.log('Month data updated successfully!');
    } catch (error) {
        console.error('Error updating month data:', error);
    }
}


import { spawn } from 'child_process';

async function extractWordsAndPOS(text) {
    return new Promise((resolve, reject) => {
        // Spawn a child process to execute the Python script
        const pythonProcess = spawn('python', ['../server/utils/nltk_pos_tagger.py', text]);

        let output = '';

        // Capture stdout data
        pythonProcess.stdout.on('data', (data) => {
            output += data.toString();
        });

        // Capture stderr data
        pythonProcess.stderr.on('data', (data) => {
            console.error('Python script error:', data.toString());
            reject(data.toString());
        });

        // Handle process exit
        pythonProcess.on('close', (code) => {
            if (code === 0) {
                // Resolve with parsed output
                resolve(JSON.parse(output));
            } else {
                console.error('Python script exited with non-zero code:', code);
                reject('Python script exited with non-zero code: ' + code);
            }
        });
    });
}



async function storeWordsInDatabase(words, kk) {
    try {
        console.log('Words:', words);
        console.log('Type of words:', typeof words);
        const x = parseInt(kk)
        console.log(typeof x);

        // Loop through the extracted words and store them in the database
        for (const { word, pos } of words) {
            // Ensure word is not null before storing
            if (word && pos) {
                const worddata = {
                    entryID: x,
                    word: word,
                    pos: pos
                }
                console.log(worddata)
                await WordEntryData.create(worddata);
            }
        }
        console.log('Words stored in the database successfully!');
    } catch (error) {
        console.error('Error storing words in the database:', error);
    }
}



const newdataEntry = async (req, res, next) => {
    const text = req.body.abstract_text.toLowerCase();
    const extractedDate = extractDateFromText(text);

    if (extractedDate) {
        const entryData = {
            abstract_text: req.body.abstract_text.toLowerCase(),
            degree_of_injury: req.body.degree_of_injury.toLowerCase(),
            part_of_body: req.body.part_of_body.toLowerCase(),
            event_type: req.body.event_type.toLowerCase(),
            env_factor: req.body.env_factor.toLowerCase(),
            human_factor: req.body.human_factor.toLowerCase(),
            user_email: 'abc@gmail.com',
            date: extractedDate,
            daysdiff: 0
        };

        try {
            const insertionIndex = await findInsertionIndex(extractedDate);
            const entryId = await insertEntry(entryData, insertionIndex); // Get the id of the inserted entry

            console.log(entryId);

            if (entryId) {
                // Update month data with the new entry
                await updateMonthData(extractedDate, 1);

                // Extract words and their parts of speech
                try {
                    const words = await extractWordsAndPOS(req.body.abstract_text);
                    // Store extracted words in the database
                    await storeWordsInDatabase(words, entryId);

                    res.status(200).json({ message: 'Entry successful!' });
                } catch (extractionError) {
                    console.error('Error extracting words and parts of speech:', extractionError);
                    res.status(500).json({ message: 'Error extracting words and parts of speech' });
                }
            } else {
                res.status(502).json({ message: 'Error while entering the data' });
            }
        } catch (insertionError) {
            console.error('Error inserting entry:', insertionError);
            res.status(500).json({ message: 'Error inserting entry' });
        }
    } else {
        res.status(400).json({ message: 'No valid date found in the text' });
    }
};


export { newdataEntry };
