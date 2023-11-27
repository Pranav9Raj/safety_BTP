import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';


dotenv.config({ path: './.env' });

let user = process.env.DATABASE_USER;
let password = process.env.DATABASE_PASSWORD;
let database_login = process.env.DATABASE_LOGIN;
let database_data= process.env.DATABASE_DATA;

const sequelize = new Sequelize(database_login, user, password, {
    dialect: 'mysql',
    host: 'localhost', 
});


const sequelize_data = new Sequelize(database_data, user, password, {
    dialect: 'mysql',
    host: 'localhost', 
});

export default {
    sequelize,
    sequelize_data,
};