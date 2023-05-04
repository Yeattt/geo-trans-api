const { DataTypes } = require('sequelize');

const db = require('../../config/db');

const Usuario = db.define('usuarios', {
   dni: {
      type: DataTypes.INTEGER,
      allowNull: false
   },
   edad: {
      type: DataTypes.INTEGER,
      allowNull: false
   },
   email: {
      type: DataTypes.STRING,
      unique: true
   },
   contrasena: {
      type: DataTypes.STRING
   },
   rol: {
      type: DataTypes.INTEGER,
      references: {
         model: 'roles',
         key: 'id'
      }
   }
});

module.exports = Usuario;