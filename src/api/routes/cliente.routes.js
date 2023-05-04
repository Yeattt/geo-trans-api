const router = require('express').Router();

const { getClients, getOneClient, postClient, putClient, deleteClient } = require('../controllers/cliente.controller');

router.get('/', getClients);
router.get('/:id', getOneClient);
router.post('/create', postClient);
router.put('/update/:id', putClient);
router.delete('/delete/:id', deleteClient);

module.exports = router;