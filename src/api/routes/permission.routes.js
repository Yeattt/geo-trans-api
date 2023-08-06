const router = require('express').Router();

const { check } = require('express-validator');
const { getPermissions, getOnePermission, createPermission, updatePermission, deletePermission } = require('../controllers/permission.controller');

router.get('/', getPermissions);

router.get('/:nombre', getOnePermission);

router.post('/create', [
    check('nombre', 'The name field is required').notEmpty(),
    check('nombre', 'The name field is String').isString()
],createPermission);

router.put('/update/:id', updatePermission);

router.delete('/delete/:id', deletePermission);

module.exports = router;