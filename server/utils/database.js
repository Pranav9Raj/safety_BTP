import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';


dotenv.config({ path: './.env' });

let user = process.env.DATABASE_USER;
let password = process.env.DATABASE_PASSWORD;
let database = process.env.DATABASE;

const sequelize = new Sequelize(database, user, password, {
    dialect: 'mysql',
    host: 'localhost', 
});

export default sequelize;