import xlsx from 'xlsx';
import axios from 'axios'; // Import axios to make HTTP requests

import dotenv from 'dotenv';
dotenv.config();

const importDataFromExcel = async (filePath) => {
    try {
        // Read the Excel file
        const workbook = xlsx.readFile(filePath);
        const sheetName = workbook.SheetNames[0]; // Assuming data is in the first sheet
        const worksheet = workbook.Sheets[sheetName];
        const data = xlsx.utils.sheet_to_json(worksheet);

        // Loop through each row
        for (const row of data) {
            // Extract data from Excel row
            const { 'Abstract Text': Abstract_Text, 'Degree of Injury': Degree_of_Injury, 'Part of Body': Part_of_Body, 'Event type': Event_Type, 'Environmental Factor': Environmental_Factor, 'Human Factor': Human_Factor } = row;

            // Prepare data object for data entry
            const entryData = {
                abstract_text: Abstract_Text ? Abstract_Text.toLowerCase() : '',
                degree_of_injury: Degree_of_Injury ? Degree_of_Injury.toLowerCase() : '',
                part_of_body: Part_of_Body ? Part_of_Body.toLowerCase() : '',
                event_type: Event_Type ? Event_Type.toLowerCase() : '',
                env_factor: Environmental_Factor ? Environmental_Factor.toLowerCase() : '',
                human_factor: Human_Factor ? Human_Factor.toLowerCase() : '',
            };

            try {
                // Make a POST request to the /newdataentry endpoint with the entryData
                await axios.post('http://localhost:5000/newdataentry', entryData);
                console.log('Data entry successful:', entryData);
            } catch (error) {
                console.error('Error posting data to server:', error);
            }
        }

        console.log('Data imported successfully!');
    } catch (error) {
        console.error('Error importing data from Excel:', error);
    }
};


const excelFilePath = 'C:\\Users\\prbni\\Desktop\\osha2year.xlsx';
importDataFromExcel(excelFilePath);
