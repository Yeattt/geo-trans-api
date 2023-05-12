const { DataTypes } = require('sequelize');
const db = require('../../config/db')
const Client = require('../models/client')

const Price = db.define('prices', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    codigoCotizacion: {
        type: DataTypes.INTEGER,
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
    }
    // clientId: {
    //     type: DataTypes.INTEGER,
    //     references: {
    //         model: Client,
    //         key: 'id'
    //     }
    // }
});
// Price.belongsTo(Client, { foreignKey: 'clientId', targetKey: 'id' });

module.exports = Price