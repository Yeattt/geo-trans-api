const router = require('express').Router();

const { createVehicleType, getOneVehicleType, getVehiclesType, updateVehicleType, deleteVehicleType } = require('../controllers/vehicles-type.controller');

router.get('/', getVehiclesType);

router.get('/:nombre', getOneVehicleType);

router.post('/create', createVehicleType);

router.put('/update/:id', updateVehicleType);

router.delete('/delete/:id', deleteVehicleType);

module.exports = router;