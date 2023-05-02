const { DataTypes } = require('sequelize')
const db = require("../../config/db")

const cliente = db.define('Clientes',{
    Documento:{
        type: DataTypes.INTEGER
    },
    DuenoPoliza:{
        type : DataTypes.STRING
    },
    Id:{
        type : DataTypes.INTEGER
    },
    Nombre:{
        type : DataTypes.STRING
    },
    Razon_Social:{
        type : DataTypes.STRING
    },
    Telefono:{
        type: DataTypes.INTEGER
    }
})

module.exports = cliente;