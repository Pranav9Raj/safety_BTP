import Data from '../models/data.js';


const graphData = (req, res, next) =>{
    const { column, feature } = req.query;

    Data.count({ where: { [column]: feature } })
        .then(count => {
            res.status(200).json({ count });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ message: 'Error while fetching data' });
        });
};


export {graphData};