const { DataTypes } = require('sequelize');
const db = require('../../config/db');

const Permission = require('./permission');
const Privileges = require('./privileges');

const RolesPrivileges = db.define('roles_privilegios', {
   selfGranted: DataTypes.BOOLEAN
});

Privileges.belongsToMany(Role, { through: RolesPrivileges });
Role.belongsToMany(Privileges, { through: RolesPrivileges });

module.exports = RolesPrivileges;