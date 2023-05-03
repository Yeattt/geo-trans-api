const router = require('express').Router();

const { getClients, getOneClient } = require('../controllers/cliente.controller');

router.get('/', getClients);
router.get('/:id', getOneClient);
// router.post();
// router.put();
// router.delete();

module.exports = router;