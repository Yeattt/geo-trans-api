const router = require('express').Router();
const { getPrice, getOnePrice, createPrice, updatePrice, deletePrice } = require('../controllers/price.controller');

router.get('/', getPrice);
router.get('/:id', getOnePrice);
router.post('/create', createPrice);
router.put('/update/:id', updatePrice);
router.delete('/delete/:id', deletePrice);

module.exports = router;