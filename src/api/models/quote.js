const { DataTypes } = require('sequelize');
const db = require('../../config/db')
const User = require('./user');
const VehiclesType = require('./vehicle-type');
const Company = require('./company');

const Quote = db.define('cotizaciones', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nombreOrigen: {
        type: DataTypes.STRING,
    },
    nombreDestino: {
        type: DataTypes.STRING,
    },
    ciudadOrigen: {
        type: DataTypes.STRING,
    },
    ciudadDestino: {
        type: DataTypes.STRING,
    },
    direccion: {
        type: DataTypes.STRING,
    },
    contacto: {
        type: DataTypes.INTEGER,
    },
    fechaSolicitud: {
        type: DataTypes.STRING,
    },
    fechaServicio: {
        type: DataTypes.STRING,
    },
    horaCargue: {
        type: DataTypes.STRING
    },
    tipoCamion: {
        type: DataTypes.INTEGER,
        references: {
            model: VehiclesType,
            key: 'id'
        }
    },
    pesoAproximado: {
        type: DataTypes.INTEGER
    },
    valorMercancia: {
        type: DataTypes.INTEGER
    },
    contenido: {
        type: DataTypes.STRING
    },
    valorTransporte: {
        type: DataTypes.INTEGER
    },
    observaciones: {
        type: DataTypes.STRING
    },
    userId: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: 'id'
        }
    },
    companyId: {
        type: DataTypes.INTEGER,
        references: {
            model: Company,
            key: 'id'
        }
    },
    estado: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
});

Quote.belongsTo(User, { foreignKey: 'userId', targetKey: 'id' });
Quote.belongsTo(VehiclesType, { foreignKey: 'tipoCamion', targetKey: 'id' });
Quote.belongsTo(Company, { foreignKey: 'companyId', targetKey: 'id' });


module.exports = Quote;