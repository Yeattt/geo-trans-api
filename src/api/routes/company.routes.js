const router = require('express').Router();

const { check } = require('express-validator')
const { validateFields } = require('../middlewares/validate-fields')
const { getCompanies, getOneCompany, createCompany, updateCompany, changeStatus } = require('../controllers/company.controller');

router.get('/', getCompanies);
router.get('/:id', getOneCompany);
router.post('/create', [
    check('nit', 'The Nit only accepts numbers').isNumeric(),
    check('nit', 'The Nit is required').notEmpty(),
    check('razonSocial', 'The Business name of the company is required').notEmpty(),
    check('razonSocial', 'The Company name accepts only letters').isString(),
    check('nombreEmpresa', 'Company name is required').notEmpty(),
    check('nombreEmpresa', 'Company name is letters').isString(),
    check('telefono', 'Phone number only accepts numbers').isNumeric(),
    check('telefono', 'Phone number is required').notEmpty(),
    check('telefono', 'The Telephone number is a minimum of 10 and a maximum of 10').isLength({min: 10, max: 10}),
    check('duenoPoliza', 'Policy owner is required').notEmpty(),
    check('duenoPoliza', 'Policy owner only accepts numbers').isNumeric(),
    validateFields
], createCompany);
router.put('/update/:id', [
    check('nit', 'The Nit only accepts numbers').isNumeric(),
    check('razonsocial', 'The Company name accepts only letters').isString(),
    check('nombreempresa', 'Company name is letters').isString(),
    check('telefono', 'Phone number only accepts numbers').isNumeric(),
    check('telefono', 'The Telephone number is a minimum of 10 and a maximum of 10').isLength({min: 10, max: 10}),
    check('duenopoliza', 'Policy owner only accepts numbers').isNumeric(),
    validateFields
], updateCompany)
router.delete('/delete/:id', changeStatus)

module.exports = router;