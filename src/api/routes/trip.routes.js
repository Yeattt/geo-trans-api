const router = require('express').Router();

const { getTrips, getOneTrip, createTrip, deleteTrip, updateTrip } = require('../controllers/trip.controller');

router.get('/', getTrips);

router.get('/:id', getOneTrip);

router.post('/create', createTrip);

router.put('/update/:id', updateTrip);

router.delete('/delete/:id', deleteTrip);

module.exports = router;