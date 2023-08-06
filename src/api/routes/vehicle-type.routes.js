const router = require('express').Router();

const { check } = require('express-validator');
const { createVehicleType, getOneVehicleType, getVehiclesType, updateVehicleType, deleteVehicleType } = require('../controllers/vehicles-type.controller');

router.get('/', getVehiclesType);

router.get('/:nombre', getOneVehicleType);

router.post('/create',[
    check('nombre','The name field is required').notEmpty(),
    check('nombre', 'The name field is String').isString()
] ,createVehicleType);

router.put('/update/:id', updateVehicleType);

router.delete('/delete/:id', deleteVehicleType);

module.exports = router;