const { DataTypes } = require('sequelize');
const db = require('../../config/db');
const User = require('./user');
const Vehicle = require('./vehicles');
const Client = require('./client');

const Trips = db.define('viajes', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    cantidad: {
        type: DataTypes.INTEGER,
    },
    nombreProducto: {
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
    fechaViaje: {
        type: DataTypes.STRING
    },
    clienteId: {
        type: DataTypes.INTEGER,
        references: {
            model: Client,
            key: 'id'
        }
    },
    horaViaje: {
        type: DataTypes.STRING
    },
    conductorId: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: 'id'
        }
    },
    estadoViaje: {
        type: DataTypes.STRING,
        defaultValue: 'pendiente'
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
Trips.belongsTo(Client, { foreignKey: 'clienteId', targetKey: 'id' });
Trips.belongsTo(Vehicle, { foreignKey: 'vehiculoId', targetKey: 'id' });

module.exports = Trips