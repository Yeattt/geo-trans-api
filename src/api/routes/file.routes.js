const router = require('express').Router();

const { uploadFile, downloadFile } = require('../controllers/files.controller');

router.post('/upload', uploadFile);
router.get('/download/:filename', downloadFile)

module.exports = router;