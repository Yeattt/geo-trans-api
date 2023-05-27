const { DataTypes } = require('sequelize');
const db = require('../../config/db');

const Permission = require('./permission');

const Role = db.define('roles', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nombre: {
        type: DataTypes.STRING
    }
});

Role.belongsToMany(Permission, { through: 'Roles_Permissions', as: 'permissions' });

module.exports = Role;