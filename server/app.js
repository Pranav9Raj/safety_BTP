import express from 'express';

import combinedData from './utils/database.js';

import router from './routes/routes.js';

const app = express();
const sequelize = combinedData.sequelize;
const sequelizeData = combinedData.sequelize_data;
const sequelizeEntryData = combinedData.sequelize_entrydata;

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.use((_, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.use(router);

sequelize.sync(); 
sequelizeData.sync();
sequelizeEntryData.sync();

app.listen(5000);