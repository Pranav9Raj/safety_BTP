import { Sequelize } from 'sequelize';

import combined from '../utils/database.js';

const sequelizeEntryData = combined.sequelize_entrydata;


const EntryData = sequelizeEntryData.define('data', {
    id: {
       type: Sequelize.INTEGER,
       autoIncrement: true,
       allowNull: false,
       primaryKey: true,
    },
    abstract_text: {
       type: Sequelize.STRING,
       allowNull: false,
    },
    degree_of_injury: {
       type: Sequelize.STRING,
       allowNull: false,
    },
    part_of_body: {
       type: Sequelize.STRING,
       allowNull: false,
    },
    event_type: {
         type: Sequelize.STRING,
         allowNull: false,
    },
    env_factor: {
     type: Sequelize.STRING,
     allowNull: false,
    },
    human_factor: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    user_email: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    date: {
        type: Sequelize.DATE,
        allowNull: false,
      }
 });
 
export default EntryData;