const router = require('express').Router();

const { check } = require('express-validator')
const { validateFields } = require('../middlewares/validate-fields')
const { getCompanies, getOneCompany, createCompany, changeStatus } = require('../controllers/company.controller');

router.get('/', getCompanies);
router.get('/:id', getOneCompany);
router.post('/create', [
    check('nit', 'The Nit only accepts numbers').isNumeric(),
    check('nit', 'The Nit is required').notEmpty(),
    check('razonsocial', 'The Business name of the company is required').notEmpty(),
    check('razonsocial', 'The Company name accepts only letters').isString(),
    check('nombreempresa', 'Company name is required').notEmpty(),
    check('nombreempresa', 'Company name is letters').isString(),
    check('telefono', 'Phone number only accepts numbers').isNumeric(),
    check('telefono', 'Phone number is required').notEmpty(),
    check('telefono', 'The Telephone number is a minimum of 10 and a maximum of 10').isLength({min: 10, max: 10}),
    check('duenopoliza', 'Policy owner is required').notEmpty().isNumeric(),
    check('duenopoliza', 'Policy owner only accepts numbers').isNumeric(),
    validateFields
], createCompany);
router.delete('/delete/:id', changeStatus)

module.exports = router;