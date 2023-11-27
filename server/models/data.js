import { Sequelize } from 'sequelize';

import combined from '../utils/database.js';

const sequelizeData = combined.sequelize_data;


const Data = sequelizeData.define('data', {
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
       type: Sequelize.INTEGER,
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
    }
 });
 
export default Data;