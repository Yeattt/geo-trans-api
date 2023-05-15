const express = require('express');
const cors = require('cors');
const db = require('../../config/db');

const authRoutes = require('../routes/auth.routes');
const clientRoutes = require('../routes/client.routes')
const userRoutes = require('../routes/user.routes');
const companyRoutes = require('../routes/company.routes');
const priceRoutes = require('../routes/price.routes');
const tripRoutes = require('../routes/trips.routes')

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT || '3000';
        this.apiRoutes = {
            auth: '/api/auth',
            clients: '/api/clients',
            users: '/api/users',
            companies: '/api/companies',
            trips: '/api/trips',
            prices: '/api/prices'
        }

        this.middlewares();
        this.dbConnection();
        this.routes();
    }

    middlewares() {
        this.app.use(cors());
        this.app.use(express.json());
    }

    async dbConnection() {
        try {
            await db.authenticate();
            await db.sync({ force: true });
            console.log('Successful connection to the database');
        } catch (error) {
            throw new Error(error);
        }
    }

    routes() {
        this.app.use(this.apiRoutes.auth, authRoutes);
        this.app.use(this.apiRoutes.clients, clientRoutes);
        this.app.use(this.apiRoutes.users, userRoutes);
        this.app.use(this.apiRoutes.companies, companyRoutes);
        this.app.use(this.apiRoutes.prices, priceRoutes);
        this.app.use(this.apiRoutes.trips, tripRoutes);
    }

    listen() {
        this.app.listen(this.port, () => console.log(`Server running on port ${this.port}`));
    }
}

module.exports = Server;