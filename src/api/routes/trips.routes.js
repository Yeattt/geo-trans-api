const router = require('express').Router();
const { getOnetrip, getTrips, createtrip, deletetrip, updatetrip } = require('../controllers/trips.controllers');
router.get('/', getTrips);
router.get('/:id', getOnetrip);
router.post('/create', createtrip);
router.put('/update/:id', updatetrip);
router.delete('/delete/:id', deletetrip);

module.exports = router;