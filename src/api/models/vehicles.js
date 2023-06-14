const { DataTypes } = require('sequelize')
const db = require('../../config/db')

const Vehicle = db.define('vehiculos', {
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
    placaSemirremolque: {
        type: DataTypes.STRING
    },
    tarjetaPropiedad: {
        type: DataTypes.STRING
    },
    tecnomecanica: {
        type: DataTypes.STRING
    },
    soat: {
        type: DataTypes.STRING
    },
    estado: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
})
module.exports = Vehicle;