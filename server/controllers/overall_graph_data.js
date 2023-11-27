import Data from '../models/data.js';
import { Sequelize } from 'sequelize';

const newgraphData = async(req, res, next) =>{
    const { column } = req.query;

    try {
        const results = await Data.findAll({
            attributes: [
                [column, 'name'],
                [Sequelize.fn('COUNT', Sequelize.col(column)), 'count']
            ],
            group: column,
            raw: true
        });

        res.status(200).json(results);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Error while fetching data' });
    }
    // const { column } = req.body;

    // try {
    //     const results = await Data.findAll({
    //         attributes: [
    //             [column, 'name'],
    //             [Sequelize.fn('COUNT', Sequelize.col(column)), 'count']
    //         ],
    //         group: column,
    //         raw: true
    //     });

    //     res.status(200).json(results);
    // } catch (err) {
    //     console.log(err);
    //     res.status(500).json({ message: 'Error while fetching data' });
    // }
};





export {newgraphData};