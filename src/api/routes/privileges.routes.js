const router = require('express').Router();
const { check } = require('express-validator');

const { getPrivileges, getOnePrivileges, createPrivileges, updatePrivileges, deletePrivileges } = require('../controllers/privileges.controller');
const { validateFields } = require('../middlewares/validate-fields');

router.get('/', getPrivileges);

router.get('/:nombre', [
  check('nombre', 'Type of name required ').notEmpty(),
  check('nombre', 'The name type field must be string ').isString(),
  check('nombre', 'Minimo 3 caracteres').isLength({ min: 3 }),
  validateFields
], getOnePrivileges);

router.post('/create', createPrivileges);


router.put('/update/:id', [
  check('nombre', 'The name type field must be string ').isString(),
  check('nombre', 'Minimo 3 caracteres').isLength({ min: 3 }),
  validateFields
], updatePrivileges);


router.delete('/delete/:id', deletePrivileges);

module.exports = router;