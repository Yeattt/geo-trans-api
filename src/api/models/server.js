const express = require('express');
const cors = require('cors');
const db = require('../../config/db');

const userRoutes = require('../routes/auth.routes');

class Server {
   constructor() {
      this.app = express();
      this.port = process.env.PORT || '3000';
      this.apiRoutes = {
         auth: '/api/auth'
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
         console.log('Successful connection to the database');
      } catch (error) {
         throw new Error(error);
      }
   }

   routes() {
      this.app.use(this.apiRoutes.auth, userRoutes);
   }

   listen() {
      this.app.listen(this.port, () => console.log(`Server running on port ${this.port}`));
   }
}

module.exports = Server;