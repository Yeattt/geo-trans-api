const { DataTypes } = require('sequelize');
const db = require('../../config/db');

const Rol = db.define('roles', {
   nombre: {
      type: DataTypes.STRING
   }
});

module.exports = Rol;