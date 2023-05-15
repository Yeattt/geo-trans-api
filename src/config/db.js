const { Sequelize } = require('sequelize');

const db = new Sequelize('geo-trans-db', 'root', '', {
    host: 'localhost',
    dialect: 'mariadb',
    logging: false,
    define: {
        timestamps: false
    }
});

module.exports = db;