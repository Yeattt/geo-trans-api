const router = require('express').Router();

const { getCompanies, getOneCompany, createCompany } = require('../controllers/company.controller');

router.get('/', getCompanies);
router.get('/:id', getOneCompany);
router.post('/create', createCompany);

module.exports = router;