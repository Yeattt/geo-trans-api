const router = require('express').Router()

const { getCliente, getClienteOne } = require('../controllers/cliente.controller');

router.get('/', getCliente);
router.get('/:id', getClienteOne);
// router.post();
// router.put();
// router.delete();

module.exports = router