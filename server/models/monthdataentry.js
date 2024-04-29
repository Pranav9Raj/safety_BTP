import { Sequelize } from 'sequelize';

import combined from '../utils/database.js';

const sequelizeMonthData = combined.sequelize_monthdata;


const MonthEntryData = sequelizeMonthData.define('data', {
    id: {
       type: Sequelize.INTEGER,
       autoIncrement: true,
       allowNull: false,
       primaryKey: true,
    },
    Month: {
       type: Sequelize.STRING,
       allowNull: false,
    },
    injuries: {
      type: Sequelize.INTEGER,
      allowNull: false,
    }
 });
 
export default MonthEntryData;