const { DataTypes } = require('sequelize');
const db = require('../../config/db');
const User = require('./user');
const Vehicle = require('./vehicles');

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
    },
    tipoViaje: {
        type: DataTypes.STRING
    },
    fechaViaje:{
       type: DataTypes.STRING
    },
    cliente:{
        type:DataTypes.STRING
    },
    conductorId: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: 'id'
        }
    },
    vehiculoId: {
        type: DataTypes.INTEGER,
        references: {
            model: Vehicle,
            key: 'id'
        }
    },
    estado: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
});

Trips.belongsTo(User, { foreignKey: 'conductorId', targetKey: 'id' });
Trips.belongsTo(Vehicle, { foreignKey: 'vehiculoId', targetKey: 'id' });

module.exports = Trips