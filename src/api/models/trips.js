const { DataTypes } = require('sequelize');
const db = require('../../config/db');

const Trips = db.define('viajes', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    cantidad: {
        type: DataTypes.INTEGER,
    },
    codigoProducto: {
        type: DataTypes.STRING
    },
    destino: {
        type: DataTypes.STRING
    },
    empaque: {
        type: DataTypes.STRING
    },
    naturaleza: {
        type: DataTypes.STRING
    },
    numeroRemesa: {
        type: DataTypes.STRING
    },
    origen: {
        type: DataTypes.STRING
    },
    productoTransportar: {
        type: DataTypes.STRING
    },
    saldoPagar: {
        type: DataTypes.INTEGER
    },
    unidadMedida: {
        type: DataTypes.STRING
    },
    valorPagar: {
        type: DataTypes.INTEGER
    }
});

module.exports = Trips