const { DataTypes } = require('sequelize');
const db = require('../../config/db');

const Role = require('./role');

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

// Permission.belongsToMany(Role, { through: 'Roles_Permissions' });

module.exports = Permission;