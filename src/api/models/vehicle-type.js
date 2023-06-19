const { DataTypes } = require('sequelize');

const db = require('../../config/db');

const VehiclesType = db.define('tipos_camion', {
   id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
   },
   nombre: {
      type: DataTypes.STRING,
      allowNull: false
   }
});

module.exports = VehiclesType;