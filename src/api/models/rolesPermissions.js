const { DataTypes } = require('sequelize');
const db = require('../../config/db');

const Permission = require('./permission');
const Role = require('./role');

const RolesPermissions = db.define('roles_permisos', {
   selfGranted: DataTypes.BOOLEAN
});

Permission.belongsToMany(Role, { through: RolesPermissions });
Role.belongsToMany(Permission, { through: RolesPermissions });

module.exports = RolesPermissions;