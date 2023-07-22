const router = require('express').Router();

const { seedDB } = require('../controllers/seed.controller');

router.post('/', seedDB);

module.exports = router;