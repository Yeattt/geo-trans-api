const { DataTypes, BOOLEAN } = require("sequelize");
const db = require('../../config/db');


const Company = db.define('companies', {
    id : {
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
    estado:{
        type: DataTypes.BOOLEAN = true
    }
})


module.exports = Company;