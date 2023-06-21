const router = require('express').Router();

const { getPermissions, getOnePermission, createPermission, updatePermission, deletePermission } = require('../controllers/permission.controller');

router.get('/', getPermissions);

router.get('/:nombre', getOnePermission);

router.post('/create', createPermission);

router.put('/update/:id', updatePermission);

router.delete('/delete/:id', deletePermission);

module.exports = router;