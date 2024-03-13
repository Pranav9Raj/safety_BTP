import EntryData from '../models/entrydata.js';
import { Sequelize, Op } from 'sequelize';

const getInjuriesInTimeline = async(req, res, next) => {
  const { column, startDate, endDate } = req.query;
    console.log(startDate, endDate);

    try {
        const results = await EntryData.findAll({
            attributes: [
                [column, 'name'],
                [Sequelize.fn('COUNT', Sequelize.col(column)), 'count']
            ],
            where: {
                date: {
                    [Op.between]: [
                        Sequelize.literal(`'${startDate} 00:00:00'`),
                        Sequelize.literal(`'${endDate} 23:59:59'`)
                    ]
                }
            },
            group: column,
            raw: true
        });

        console.log(results);
        res.status(200).json(results);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Error while fetching data' });
    }
};

export { getInjuriesInTimeline };

