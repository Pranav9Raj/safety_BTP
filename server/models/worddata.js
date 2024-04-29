import { Sequelize } from 'sequelize';

import combined from '../utils/database.js';

const sequelizeWordData = combined.sequelize_worddata;


const WordEntryData = sequelizeWordData.define('data', {
    id: {
       type: Sequelize.INTEGER,
       autoIncrement: true,
       allowNull: false,
       primaryKey: true,
    },
    entryID: {
       type: Sequelize.INTEGER,
       allowNull: false,
    },
    word: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    pos: {
        type: Sequelize.STRING,
        allowNull: false,  
    }
 });
 
export default WordEntryData;