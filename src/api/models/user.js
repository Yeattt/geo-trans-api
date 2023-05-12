const { DataTypes } = require('sequelize');
const db = require('../../config/db');
const Role = require('./role');

const User = db.define('usuarios', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    dni: {
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
    contrasena: {
        type: DataTypes.STRING
    },
    rolId: {
        type: DataTypes.INTEGER,
        references: {
            model: Role,
            key: 'id'
        }
    }
});

User.belongsTo(Role, { foreignKey: 'rolId', targetKey: 'id' });

module.exports = User;