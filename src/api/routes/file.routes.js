const router = require('express').Router();

const { uploadFile } = require('../controllers/files.controller');

router.post('/upload', uploadFile);

module.exports = router;