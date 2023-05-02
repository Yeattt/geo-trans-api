const Server = require('./api/models/server');
const dotenv = require('dotenv');

dotenv.config();

const server = new Server();
server.listen();