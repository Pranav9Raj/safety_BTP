import EntryData from '../models/entrydata.js';
import { Op } from 'sequelize';

const calculateDateDifferences = async (req, res, next) => {
    const { startDate, endDate } = req.query;

    try {
        // Query the database to retrieve entries within the user-provided date range, sorted by date
        const entries = await EntryData.findAll({
            where: {
                date: {
                    [Op.between]: [startDate, endDate]
                }
            },
            order: [['date', 'ASC']], // Sort by date in ascending order
            raw: true
        });

        // Initialize an array to store the calculated date differences
        const dateDifferences = [];

        // Iterate over the sorted entries to calculate the difference in days between consecutive entries
        for (let i = 0; i < entries.length - 1; i++) {
            const currentDate = new Date(entries[i].date);
            const nextDate = new Date(entries[i + 1].date);
            const differenceInDays = Math.round((nextDate - currentDate) / (1000 * 60 * 60 * 24)); // Calculate difference in days
            dateDifferences.push(differenceInDays);
        }

        // Calculate mean and variance of date differences
        const mean = dateDifferences.reduce((acc, val) => acc + val, 0) / dateDifferences.length;
        const variance = dateDifferences.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0) / dateDifferences.length;

        // Return the calculated date differences, mean, and variance as a response
        res.status(200).json({ dateDifferences, mean, variance });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Error while fetching data' });
    }
};

export { calculateDateDifferences };
