const { DataTypes } = require('sequelize');

const db = require('../../config/db');

const User = db.define('usuarios', {
   email: {
      type: DataTypes.STRING
   },
   password: {
      type: DataTypes.STRING
   }
});

module.exports = User;