const router = require('express').Router();

const { getClients, getOneClient, updateClient, createClient, deleteClient } = require('../controllers/client.controller');

router.get('/', getClients);
router.get('/:id', getOneClient);
router.post('/create/', createClient);
router.put('/update/:id', updateClient);
router.delete('/delete/:id', deleteClient);

module.exports = router;