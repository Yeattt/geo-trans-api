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
    },
    permissionId: {
        type: DataTypes.INTEGER,
        references: {
            model: Permission,
            key: 'id'
        }
    },
});

Role.belongsTo(Permission, { foreignKey: 'permissionId', targetKey: 'id' });

module.exports = Role;