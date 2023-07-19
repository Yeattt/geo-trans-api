const { DataTypes } = require('sequelize');
const db = require('../../config/db');

const File = db.define('archivos', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  nombre: {
    type: DataTypes.STRING,
    unique: true
  }
});

module.exports = File;