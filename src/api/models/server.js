const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const db = require('../../config/db');

const RolesPrivileges = require('../models/rolesPrivileges');
const RolesPermissions = require('../models/rolesPermissions');

const authRoutes = require('../routes/auth.routes');
const clientRoutes = require('../routes/client.routes')
const companyRoutes = require('../routes/company.routes');
const fileRoutes = require('../routes/file.routes');
const quoteRoutes = require('../routes/quote.routes');
const permissionRoutes = require('../routes/permission.routes');
const privilegesRoutes = require('../routes/privileges.routes');
const roleRoutes = require('../routes/role.routes');
const tripRoutes = require('../routes/trip.routes');
const userRoutes = require('../routes/user.routes');
const vehicleRoutes = require('../routes/vehicles.routes');
const vehicleTypeRoutes = require('../routes/vehicle-type.routes');
const seedRoutes = require('../routes/seed.routes');

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT || '3000';
        this.apiRoutes = {
            auth: '/api/auth',
            clients: '/api/clients',
            companies: '/api/companies',
            files: '/api/files',
            permissions: '/api/permissions',
            privileges: '/api/privileges',
            quotes: '/api/quotes',
            roles: '/api/roles',
            trips: '/api/trips',
            users: '/api/users',
            vehicles: '/api/vehicles',
            vehiclesTypes: '/api/trucks/types',
            seed: '/api/seed',
        }

        this.middlewares();
        this.dbConnection();
        this.routes();
    }

    middlewares() {
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(fileUpload());
    }

    async dbConnection() {
        try {
            await db.sync({ force: true });
            await db.authenticate();
            console.log('Successful connection to the database');
        } catch (error) {
            throw new Error(error);
        }
    }

    routes() {
        this.app.use(this.apiRoutes.auth, authRoutes);
        this.app.use(this.apiRoutes.clients, clientRoutes);
        this.app.use(this.apiRoutes.companies, companyRoutes);
        this.app.use(this.apiRoutes.files, fileRoutes);
        this.app.use(this.apiRoutes.quotes, quoteRoutes);
        this.app.use(this.apiRoutes.permissions, permissionRoutes);
        this.app.use(this.apiRoutes.privileges, privilegesRoutes);
        this.app.use(this.apiRoutes.roles, roleRoutes);
        this.app.use(this.apiRoutes.trips, tripRoutes);
        this.app.use(this.apiRoutes.users, userRoutes);
        this.app.use(this.apiRoutes.vehicles, vehicleRoutes);
        this.app.use(this.apiRoutes.vehiclesTypes, vehicleTypeRoutes);
        this.app.use(this.apiRoutes.seed, seedRoutes)
    }

    listen() {
        this.app.listen(this.port, () => console.log(`Server running on port ${this.port}`));
    }
}

module.exports = Server;
