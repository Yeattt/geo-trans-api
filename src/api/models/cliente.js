const { DataTypes } = require('sequelize');
const db = require("../../config/db");

const Cliente = db.define('clientes', {
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

module.exports = Cliente;