const { DataTypes } = require('sequelize');
const db = require('../../config/db');
const Role = require('./role');
const Company = require('./company')
const Vehicle = require('./vehicles')

const User = db.define('usuarios', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    documento: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    edad: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        unique: true
    },
    nombrePlataforma:{
        type: DataTypes.STRING
    },
    linkPlataforma:{
         type: DataTypes.STRING
    },
    contrasena: {
        type: DataTypes.STRING
    },
    roleId: {
        type: DataTypes.INTEGER,
        references: {
            model: Role,
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
    vehicleId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: Vehicle,
            key: 'id'
        }
    },
    registroPendiente: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    estado: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
});

// Relacion ya es de vehiculo a viaje y usuario a viaje

User.belongsTo(Role, { foreignKey: 'roleId', targetKey: 'id' });
User.belongsTo(Company, { foreignKey: 'companyId', targetKey: 'id' });
User.belongsTo(Vehicle, { foreignKey: 'vehicleId', targetKey: 'id' })

module.exports = User;