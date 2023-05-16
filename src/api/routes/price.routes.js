const router = require('express').Router();
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validate-fields');
const { getPrice, getOnePrice, createPrice, updatePrice, deletePrice } = require('../controllers/price.controller');

router.get('/', getPrice);
router.get('/:id', getOnePrice);
router.post('/create', [
    check('codigoCotizacion', 'The field is required').notEmpty(),
    check('codigoCotizacion', 'The field only receives numeric values.').not().isNumeric(),
    check('cantidad', 'The field is required').notEmpty(),
    check('cantidad', 'The field only receives numeric values.').not().isNumeric(),
    check('codigoProducto', 'The field is required').notEmpty(),
    check('codigoProducto', 'The field only receives lines of text').not().isString(),
    check('destino', 'The field is required').notEmpty(),
    check('destino', 'The field only admits lines of text').not().isString,
    check('empaque', 'The field is required').notEmpty(),
    check('empaque', 'The field only admits lines of text').not().isString,
    check('naturaleza', 'The field is required').notEmpty(),
    check('naturaleza', 'The field only admits lines of text').not().isString,
    check('numeroRemesa', 'The field is required').notEmpty(),
    check('numeroRemesa', 'The field only admits lines of text').not().isString,
    check('origen', 'The field is required').notEmpty(),
    check('origen', 'The field only admits lines of text').not().isString,
    check('productoTransportar', 'The field is required').notEmpty(),
    check('productoTransportar', 'The field only admits lines of text').not().isString,
    check('saldoPagar', 'The field is required').notEmpty(),
    check('saldoPagar', 'The field only accepts numeric values').not().isNumeric,
    check('unidadMedida', 'The field is required').notEmpty(),
    check('unidadMedida', 'The field only accepts numeric values').not().isNumeric,
    check('valorPagar', 'The field is required').notEmpty(),
    check('valorPagar', 'The field only accepts numeric values').not().isNumeric,
    check('userId', 'The field is required').notEmpty(),
    validateFields
], createPrice);
router.put('/update/:id', [
    check('codigoCotizacion', 'The field only receives numeric values.').not().isNumeric(),
    check('cantidad', 'The field only receives numeric values.').not().isNumeric(),
    check('codigoProducto', 'The field only receives lines of text').not().isString(),
    check('destino', 'The field only admits lines of text').not().isString,
    check('empaque', 'The field only admits lines of text').not().isString,
    check('naturaleza', 'The field only admits lines of text').not().isString,
    check('numeroRemesa', 'The field only admits lines of text').not().isString,
    check('origen', 'The field only admits lines of text').not().isString,
    check('productoTransportar', 'The field only admits lines of text').not().isString,
    check('saldoPagar', 'The field only accepts numeric values').not().isNumeric,
    check('unidadMedida', 'The field only accepts numeric values').not().isNumeric,
    check('valorPagar', 'The field only accepts numeric values').not().isNumeric,
    validateFields
], updatePrice);
router.delete('/delete/:id', deletePrice);

module.exports = router;