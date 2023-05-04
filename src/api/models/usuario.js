const { DataTypes } = require('sequelize');
const db = require('../../config/db');
const Rol = require('./rol');

const Usuario = db.define('usuarios', {
   id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
   },
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
   }
});

Usuario.hasOne(Rol, {
   foreignKey: 'rolId',
   sourceKey: 'id'
});
Rol.belongsTo(Usuario, { foreignKey: 'rolId', targetKey: 'id' });

module.exports = Usuario;