const router = require('express').Router();

const { getRoles, getOneRole, createRole, updateRole, deleteRole, assignPermissionsToRole, assignPrivilegesToRole } = require('../controllers/role.controller');

router.get('/', getRoles);

// router.get('/:nombre', getOneRole);
router.get('/:id', getOneRole);

router.post('/create', createRole);

router.put('/update/:id', updateRole);

router.put('/assign/:id', assignPermissionsToRole);

router.put('/privileges/assign/:id', assignPrivilegesToRole);

router.delete('/delete/:id', deleteRole);

module.exports = router;