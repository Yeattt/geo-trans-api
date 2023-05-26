const { DataTypes } = require('sequelize');
const db = require('../../config/db');

const Permission = require('../models/permission');

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

Role.hasMany(Permission, {
    foreignKey: 'roleId',
    as: 'permissions'
});

module.exports = Role;