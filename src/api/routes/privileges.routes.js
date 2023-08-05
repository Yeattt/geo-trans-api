const router = require('express').Router();

const { getPrivileges, getOnePrivileges, createPrivileges, updatePrivileges, deletePrivileges } = require('../controllers/privileges.controller');

router.get('/', getPrivileges);

router.get('/:nombre', getOnePrivileges);

router.post('/create', createPrivileges);
check('nombre', 'Type of name required ').notEmpty(),
check('nombre', 'The name type field must be string ').isString(),
check('nombre', 'Minimo 3 caracteres').minLength(3),
validateFields

router.put('/update/:id', updatePrivileges);
check('nombre', 'The name type field must be string ').isString(),
check('nombre', 'Minimo 3 caracteres').mynLength(3),
validateFields


router.delete('/delete/:id', deletePrivileges);

module.exports = router;