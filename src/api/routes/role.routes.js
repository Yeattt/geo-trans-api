const router = require('express').Router();

const { getRoles, getOneRole, createRole, updateRole, deleteRole } = require('../controllers/role.controller');

router.get('/', getRoles);

router.get('/:id', getOneRole);

router.post('/create', createRole);

router.put('/update/:id', updateRole);

router.delete('/delete/:id', deleteRole);

module.exports = router;