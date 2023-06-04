const { DataTypes } = require('sequelize');
const db = require('../../config/db');

const Permission = db.define('permisos', {
   id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
   },
   nombre: {
      type: DataTypes.STRING
   }
});

module.exports = Permission;