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
    duenoPoliza: {
        type: DataTypes.STRING
    },
    nombre: {
        type: DataTypes.STRING
    },
    razonSocial: {
        type: DataTypes.STRING
    },
    telefono: {
        type: DataTypes.INTEGER
    }
});

module.exports = Client;