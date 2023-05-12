const { DataTypes } = require('sequelize');
const db = require('../../config/db');
const Role = require('./role');
const Company = require('./company')

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
         model: Rol,
         key: 'id'
      }
   },
   companyId: {
      type: DataTypes.INTEGER,
      references: {
         model: Company,
         key: 'id'
      }
   }
});

User.belongsTo(Company, { foreignKey: 'companyId', targetKey: 'id'});

User.belongsTo(Role, { foreignKey: 'rolId', targetKey: 'id' });

module.exports = User;