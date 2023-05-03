const { DataTypes } = require('sequelize')
const db = require("../../config/db")

const cliente = db.define('Clientes', {
    Documento: {
        type: DataTypes.INTEGER
    },
    DuenoPoliza: {
        type: DataTypes.STRING
    },
    Id: {
        type: DataTypes.SMALLINT,
        primaryKey: true
    },
    Nombre: {
        type: DataTypes.STRING
    },
    RazonSocial: {
        type: DataTypes.STRING
    },
    Telefono: {
        type: DataTypes.INTEGER
    }
})

module.exports = cliente;