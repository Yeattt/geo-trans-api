const { DataTypes } = require('sequelize');
const db = require('../../config/db');

const Permission = db.define('permisos', {
   nombre: {
      type: DataTypes.STRING
   }
});

module.exports = Permission;