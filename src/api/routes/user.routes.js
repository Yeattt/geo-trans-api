const router = require('express').Router();

const { getUsers, getOneUser, createUser, updateUser, deleteUser } = require('../controllers/user.controller');

router.get('/', getUsers);
router.get('/:id', getOneUser);
router.post('/create', createUser);
router.put('/update/:id', updateUser);
router.delete('/delete/:id', deleteUser);

module.exports = router;