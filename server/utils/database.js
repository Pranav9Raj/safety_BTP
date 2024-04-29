import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';


dotenv.config({ path: './.env' });

let user = process.env.DATABASE_USER;
let password = process.env.DATABASE_PASSWORD;
let database_login = process.env.DATABASE_LOGIN;
let database_data= process.env.DATABASE_DATA;
let database_entrydata = process.env.DATABASE_ENTRY;
let database_monthly = process.env.DATABASE_MONTH;
let database_word = process.env.DATABASE_POS;

const sequelize = new Sequelize(database_login, user, password, {
    dialect: 'mysql',
    host: 'localhost', 
});


const sequelize_data = new Sequelize(database_data, user, password, {
    dialect: 'mysql',
    host: 'localhost', 
});


const sequelize_entrydata = new Sequelize(database_entrydata, user, password, {
    dialect: 'mysql',
    host: 'localhost', 
});

const sequelize_monthdata = new Sequelize(database_monthly, user, password, {
    dialect: 'mysql',
    host: 'localhost', 
});

const sequelize_worddata = new Sequelize(database_word, user, password, {
    dialect: 'mysql',
    host: 'localhost', 
});

export default {
    sequelize,
    sequelize_data,
    sequelize_entrydata,
    sequelize_monthdata,
    sequelize_worddata
};