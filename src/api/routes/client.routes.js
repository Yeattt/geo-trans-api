const router = require('express').Router();
const { check } = require('express-validator')
const { validateFields } = require('../middlewares/validate-fields');

const { getClients, getOneClient, updateClient, createClient, deleteClient } = require('../controllers/client.controller');

router.get('/', getClients);
router.get('/:id', getOneClient);
router.post('/create/', [
    check('documento', 'The document field is required').notEmpty(),
    check('documento', 'The document field only receives numbers').isNumeric(),
    check('documento', 'The document field receives a minimum of 7 and a maximum of 10 ').isLength({
        min: 7,
        max: 10
    }),
    check('nombre', 'The document field only receives letters').isString(),
    check('razonSocial', 'The Company name field is required').notEmpty(),
    check('razonSocial', 'The Company name Fiel is letters').isString(),
    check('telefono', 'The telephone field only receives numbers').isNumeric(),
    check('telefono', 'The telephone field is required').notEmpty(),
    check('telefono', 'The telephone field receives a minimum of 10').isLength({ min: 10 }),
    validateFields
], createClient);
router.put('/update/:id', [
    check('documento', 'The document field only receives numbers').isNumeric(),
    check('documento', 'The document field receives a minimum of 7 and a maximum of 10 ').isLength({
        min: 7,
        max: 10
    }),
    check('nombre', 'The document field only receives letters').isString(),
    check('telefono', 'The telephone field only receives numbers').isNumeric(),
    check('telefono', 'The telephone field receives a minimum of 10').isLength({ min: 10 }),
    check('razonSocial', 'The Company name Fiel is letters').isString(),
    validateFields
], updateClient);
router.delete('/delete/:id', deleteClient);

module.exports = router;