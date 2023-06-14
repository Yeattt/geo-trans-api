const { DataTypes } = require('sequelize');
const db = require('../../config/db')
const User = require('./user')

const Quote = db.define('cotizaciones', {
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
    },
    userId: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: 'id'
        }
    },
    estado: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
});

Quote.belongsTo(User, { foreignKey: 'userId', targetKey: 'id' });

module.exports = Quote;