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
    razonSocial: {
        type: DataTypes.STRING,
    },
    nombreEmpresa: {
        type: DataTypes.STRING
    },
    telefono: {
        type: DataTypes.INTEGER
    },
    duenoPoliza: {
        type: DataTypes.STRING
    },
    estado: {
        type: DataTypes.BOOLEAN
    }
});


module.exports = Company;