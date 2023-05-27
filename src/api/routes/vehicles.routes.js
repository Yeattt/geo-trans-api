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
router.post('/create', [
    check('tipoCamion', 'Type of truck required ').notEmpty(),
    check('tipoCamion', 'The truck type field must be a text string ').isString(),
    check('modelo', 'Required Model ').notEmpty(),
    check('modelo', 'The model field must be a text string.').isString(),
    check('marca', 'Required brand').notEmpty(),
    check('marca', 'The brand field must be a text string').isString(),
    check('placa', 'Required plate').notEmpty(),
    check('placa', 'The plaque field must be a text string').isString(),
    check('placaSemirremolque', 'The semi-trailer plate field is required').notEmpty(),
    check('placaSemirremolque', 'The semi-trailer plate field must be a text string').isString(),
    check('tarjetaPropiedad', 'The property card field is required').notEmpty(),
    check('tarjetaPropiedad', 'The property card field must be a text string').isString(),
    check('tecnomecanica', 'The techno-mechanic field is required').notEmpty(),
    check('tecnomecanica', 'The techno-mechanical field is must be a text string').notEmpty(),
    check('soat', 'The soat fied is required').notEmpty(),
    check('soat', 'The soat must be a text stirng').isString(),
    validateFields
], createVehicle);
router.put('/', [
    check('tipoCamion', 'Type of truck required ').notEmpty(),
    check('tipoCamion', 'The truck type field must be a text string ').isString(),
    check('modelo', 'Required Model ').notEmpty(),
    check('modelo', 'The model field must be a text string.').isString(),
    check('marca', 'Required brand').notEmpty(),
    check('marca', 'The brand field must be a text string').isString(),
    check('placa', 'Required plate').notEmpty(),
    check('placa', 'The plaque field must be a text string').isString(),
    check('placaSemirremolque', 'The semi-trailer plate field is required').notEmpty(),
    check('placaSemirremolque', 'The semi-trailer plate field must be a text string').isString(),
    check('tarjetaPropiedad', 'The property card field is required').notEmpty(),
    check('tarjetaPropiedad', 'The property card field must be a text string').isString(),
    check('tecnomecanica', 'The techno-mechanic field is required').notEmpty(),
    check('tecnomecanica', 'The techno-mechanical field is must be a text string').notEmpty(),
    check('soat', 'The soat fied is required').notEmpty(),
    check('soat', 'The soat must be a text stirng').isString(),
    validateFields,
], updateVehicle);
router.delete('/', deleteVehicle);

module.exports = router;