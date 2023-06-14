const { DataTypes } = require('sequelize');
const db = require("../../config/db");

const Client = db.define('clientes', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    documento: {
        type: DataTypes.INTEGER
    },
    nombre: {
        type: DataTypes.STRING
    },
    razonSocial: {
        type: DataTypes.STRING
    },
    telefono: {
        type: DataTypes.INTEGER
    },
    estado: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
});

module.exports = Client;