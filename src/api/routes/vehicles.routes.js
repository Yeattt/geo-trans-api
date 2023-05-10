const router = require('express').Router()

const {
    getVehicle,
    getOneVehicle,
    createVehicle,
    updateVehicle,
    deleteVehicle
} = require('../controllers/vehicles.controller');

router.get('/', getVehicle);
router.get('/', getOneVehicle);
router.post('/', createVehicle);
router.put('/', updateVehicle);
router.delete('/', deleteVehicle);

module.exports = router;