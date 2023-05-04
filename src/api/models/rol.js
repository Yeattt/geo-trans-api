const { DataTypes } = require('sequelize');
const db = require('../../config/db');

const Rol = db.define('roles', {
   id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
   },
   nombre: {
      type: DataTypes.STRING
   }
});

module.exports = Rol;