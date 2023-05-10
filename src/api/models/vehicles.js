const { DataTypes } = require('sequelize')
const db = require('../../config/db')

const Vehicle = db.define('vehicles', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    tipoCamion: {
        type: DataTypes.STRING
    },
    modelo: {
        type: DataTypes.STRING
    },
    marca: {
        type: DataTypes.STRING
    },
    placa: {
        type: DataTypes.STRING
    },
    placaSemiremolque: {
        type: DataTypes.STRING
    },
    parjetaPropiedad: {
        type: DataTypes.STRING
    },
    tecnomecanica: {
        type: DataTypes.STRING
    },
    soat: {
        type: DataTypes.STRING
    },
})
module.exports = Vehicle;