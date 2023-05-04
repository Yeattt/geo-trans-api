const router = require('express').Router();

const { getUsers, getOneUser, createUser, updateUser } = require('../controllers/usuario.controller');

router.get('/', getUsers);
router.get('/:id', getOneUser);
router.post('/create', createUser);
router.put('/update/:id', updateUser);

module.exports = router;