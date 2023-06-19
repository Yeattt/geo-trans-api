const { DataTypes } = require('sequelize')
const db = require('../../config/db');
const VehiclesType = require('./vehicle-type');

const Vehicle = db.define('vehiculos', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    modelo: {
        type: DataTypes.INTEGER
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
    tipoCamion: {
        type: DataTypes.INTEGER,
        references: {
            model: VehiclesType,
            key: 'id'
        }
    },
    estado: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
});

Vehicle.belongsTo(VehiclesType, { foreignKey: 'tipoCamion', targetKey: 'id' });

module.exports = Vehicle;