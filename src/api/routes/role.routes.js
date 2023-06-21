const router = require('express').Router();

const { getRoles, getOneRole, createRole, updateRole, deleteRole, assignPermissionsToRole } = require('../controllers/role.controller');

router.get('/', getRoles);

router.get('/:nombre', getOneRole);

router.post('/create', createRole);

router.put('/update/:id', updateRole);

router.put('/assign/:id', assignPermissionsToRole);

router.delete('/delete/:id', deleteRole);

module.exports = router;