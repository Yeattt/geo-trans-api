const router = require('express').Router()
const { check } = require('express-validator')
const { validateFields } = require('../middlewares/validate-fields');
const {
    getVehicle,
    getOneVehicle,
    createVehicle,
    updateVehicle,
    deleteVehicle
} = require('../controllers/vehicles.controller');

router.get('/', getVehicle);
router.get('/', getOneVehicle);
router.post('/', [
    check('Tipo camion', 'Type of truck required ').notEmpty(),
    check('Tipo camion', 'The truck type field must be a text string ').isString(),
    check('Modelo', 'Required Model ').notEmpty(),
    check('Modelo', 'The model field must be a text string.').isString(),
    check('Marca', 'Required brand').notEmpty(),
    check('Marca', 'The brand field must be a text string').isString(),
    check('Placa', 'Required plate').notEmpty(),
    check('Placa', 'The plaque field must be a text string').isString(),
    check('Placa semirremolque', 'The semi-trailer plate field is required').notEmpty(),
    check('Placa semirremolque', 'The semi-trailer plate field must be a text string').isString(),
    check('Tarjeta de propiedad', 'The property card field is required').notEmpty(),
    check('Tarjeta de propiedad', 'The property card field must be a text string').isString(),
    check('Tecnomecanica', 'The techno-mechanic field is required').notEmpty(),
    check('Tecnomecanica', 'The techno-mechanical field is must be a text string').notEmpty(),
    check('Soat', 'The soat fied is required').notEmpty(),
    check('Soat', 'The soat must be a text stirng').isString(),
    validateFields
], createVehicle);
router.put('/', [
    check('Tipo camion', 'Type of truck required ').notEmpty(),
    check('Tipo camion', 'The truck type field must be a text string ').isString(),
    check('Modelo', 'Required Model ').notEmpty(),
    check('Modelo', 'The model field must be a text string.').isString(),
    check('Marca', 'Required brand').notEmpty(),
    check('Marca', 'The brand field must be a text string').isString(),
    check('Placa', 'Required plate').notEmpty(),
    check('Placa', 'The plaque field must be a text string').isString(),
    check('Placa semirremolque', 'The semi-trailer plate field is required').notEmpty(),
    check('Placa semirremolque', 'The semi-trailer plate field must be a text string').isString(),
    check('Tarjeta de propiedad', 'The property card field is required').notEmpty(),
    check('Tarjeta de propiedad', 'The property card field must be a text string').isString(),
    check('Tecnomecanica', 'The techno-mechanic field is required').notEmpty(),
    check('Tecnomecanica', 'The techno-mechanical field is must be a text string').notEmpty(),
    check('Soat', 'The soat fied is required').notEmpty(),
    check('Soat', 'The soat must be a text stirng').isString(),
    validateFields,
], updateVehicle);
router.delete('/', deleteVehicle);

module.exports = router;