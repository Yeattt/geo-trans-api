const router = require('express').Router();

const { activateUser, getUsers, getOneUser, createUser, updateUser, deleteUser } = require('../controllers/user.controller');

router.get('/', getUsers);

router.get('/:documento', getOneUser);

router.post('/create', createUser);

router.put('/update/:id', updateUser);

router.put('/allow/:id', activateUser);

router.delete('/delete/:id', deleteUser);

module.exports = router;