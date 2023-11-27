import { Sequelize } from 'sequelize';

import combined from '../utils/database.js';

const sequelize = combined.sequelize;

const User = sequelize.define('users', {
   id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
   },
   email: {
      type: Sequelize.STRING,
      allowNull: false,
   },
   name: {
      type: Sequelize.STRING,
      allowNull: false,
   },
   password: {
      type: Sequelize.STRING,
      allowNull: false,
   },
   organisation_name: {
        type: Sequelize.STRING,
        allowNull: false,
   },
   contact_number: {
    type: Sequelize.STRING,
    allowNull: false,
   },
});

export default User;