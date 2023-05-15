const { DataTypes } = require("sequelize");
const db = require('../../config/db');


const Company = db.define('companias', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nit: {
        type: DataTypes.INTEGER,
        unique: true
    },
    razonsocial: {
        type: DataTypes.STRING,
    },
    nombreempresa: {
        type: DataTypes.STRING
    },
    telefono: {
        type: DataTypes.INTEGER
    },
    duenopoliza: {
        type: DataTypes.STRING
    },
    estado: {
        type: DataTypes.BOOLEAN
    }
})


module.exports = Company;