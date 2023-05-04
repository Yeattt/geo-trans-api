const { DataTypes } = require('sequelize');
const db = require('../../config/db');

const Permiso = db.define('permisos', {
   nombre: {
      type: DataTypes.STRING
   }
});

module.exports = Permiso;