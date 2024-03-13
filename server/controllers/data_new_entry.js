// import EntryData from '../models/entrydata.js';
// import { isAuth } from '../controllers/auth.js';

// function extractDateFromText(text) {
//     const dateRegex = /\b(?:jan(?:uary)?|feb(?:ruary)?|mar(?:ch)?|apr(?:il)?|may|jun(?:e)?|jul(?:y)?|aug(?:ust)?|sep(?:tember)?|oct(?:ober)?|nov(?:ember)?|dec(?:ember)?)\s(\d{1,2}),?\s(\d{4})/i;

//     const match = text.match(dateRegex);

//     if (match) {
//         const fullDate = match[0]; // Get the full date string
//         const dateObj = new Date(fullDate);
        
//         // Extract individual components
//         const month = String(dateObj.getMonth() + 1).padStart(2, '0');
//         const day = String(dateObj.getDate()).padStart(2, '0');
//         const year = dateObj.getFullYear();

//         const formattedDate = `${year}-${month}-${day}`;
//         console.log('Formatted Date:', formattedDate);
//         return formattedDate;
//     }

//     console.log('No date found');
//     return null;
// }


// const newdataEntry = (req, res, next) => {

//     const text = req.body.abstract_text.toLowerCase();
//     const extractedDate = extractDateFromText(text);
//     console.log(extractedDate);
  
//         EntryData.create({
//           abstract_text: req.body.abstract_text.toLowerCase(),
//           degree_of_injury: req.body.degree_of_injury.toLowerCase(),
//           part_of_body: req.body.part_of_body.toLowerCase(),
//           event_type: req.body.event_type.toLowerCase(),
//           env_factor: req.body.env_factor.toLowerCase(),
//           human_factor: req.body.human_factor.toLowerCase(),
//           user_email: 'abc@gmail.com',
//           date: extractedDate,
//         //   date : '04-08-2015'
//         })
//           .then(() => {
//             res.status(200).json({ message: "entry successful!!" });
//           })
//           .catch(err => {
//             console.log(err);
//             res.status(502).json({ message: "error while entering the data" });
//           });
    
//   };
  


// export { newdataEntry };

import EntryData from '../models/entrydata.js';
import { isAuth } from '../controllers/auth.js';


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
    // Fetch existing entries sorted by date
    const existingEntries = await EntryData.findAll({
        order: [['date', 'ASC']],
    });

    // Find the correct position for the new entry
    let insertionIndex = 0;
    for (const entry of existingEntries) {
        if (newDate < entry.date) {
            break;
        }
        insertionIndex++;
    }

    return insertionIndex;
}

async function insertEntry(entryData, insertionIndex) {
    try {
        // Insert the new entry at the correct position
        await EntryData.create(entryData, { position: insertionIndex });
        console.log('Entry inserted successfully!');
        return true;
    } catch (err) {
        console.log(err);
        return false;
    }
}

const newdataEntry = async (req, res, next) => {
    const text = req.body.abstract_text.toLowerCase();
    const extractedDate = extractDateFromText(text);
    console.log(extractedDate);

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
        };

        try {
            const insertionIndex = await findInsertionIndex(extractedDate);
            const success = await insertEntry(entryData, insertionIndex);

            if (success) {
                res.status(200).json({ message: 'Entry successful!' });
            } else {
                res.status(502).json({ message: 'Error while entering the data' });
            }
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: 'Internal server error' });
        }
    } else {
        res.status(400).json({ message: 'No valid date found in the text' });
    }
};

export { newdataEntry };

