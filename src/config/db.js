const { Sequelize } = require('sequelize');

const db = new Sequelize({
    dialect: 'mysql',
    host: 'containers-us-west-39.railway.app',
    port: 7470,
    username: 'root',
    password: '6wbgc2q5XhgiJmLZrnmp',
    database: 'railway',
    logging: false,
    define: {
        timestamps: false
    }
});

module.exports = db;
