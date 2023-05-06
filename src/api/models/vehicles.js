const {DataTypes}=require('sequelize')
const db=require('../../config/db')

const Vehicle= db.define('vehicles',{
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    TipoCamion: {
        type: DataTypes.STRING
    },
    Modelo: {
        type: DataTypes.STRING
    },
    Marca: {
        type: DataTypes.STRING
    },
    Placa: {
        type: DataTypes.STRING
    },
    PlacaSemiremolque: {
        type: DataTypes.STRING
    },
    TarjetaPropiedad: {
        type: DataTypes.STRING
    },
    Tecnomecanica: {
        type: DataTypes.STRING
    },
    Soat: {
        type: DataTypes.STRING
    },
})
module.exports=Vehicle;