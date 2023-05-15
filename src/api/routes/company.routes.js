const router = require('express').Router();

const { getCompanies, getOneCompany, createCompany, changeStatus } = require('../controllers/company.controller');

router.get('/', getCompanies);
router.get('/:id', getOneCompany);
router.post('/create', createCompany);
router.delete('/delete', changeStatus)

module.exports = router;