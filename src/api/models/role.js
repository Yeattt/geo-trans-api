const { DataTypes } = require('sequelize');
const db = require('../../config/db');

const Role = db.define('roles', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nombre: {
        type: DataTypes.STRING
    },
    estado: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
});

module.exports = Role;