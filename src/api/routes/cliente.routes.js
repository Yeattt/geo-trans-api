const router = require('express').Router();

const { getClients, getOneClient, postClient, putClient, deleteClient } = require('../controllers/cliente.controller');

router.get('/', getClients);
router.get('/:id', getOneClient);
router.post('/', postClient);
router.put('/:id', putClient);
router.delete('/:id', deleteClient);

module.exports = router;