const router = require('express').Router();

const { activateUser, getUsers, getOneUser, createUser, updateUser, deleteUser, recoveryPassword, sendRecoveryPasswordEmail, getOneUserById } = require('../controllers/user.controller');

router.get('/', getUsers);

router.get('/:documento', getOneUser);

router.get('/id/:id', getOneUserById);

router.post('/create', createUser);

router.put('/update/:id', updateUser);

router.put('/sendEmail', sendRecoveryPasswordEmail);

router.put('/recovery/:id/:token', recoveryPassword);

router.put('/allow/:id', activateUser);

router.delete('/delete/:id', deleteUser);

module.exports = router;