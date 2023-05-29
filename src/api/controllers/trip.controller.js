const Trip = require('../models/trips')

const getTrips = async(req, res) => {
    try {
        const trips = await Trip.findAll();

        if (!trips) {
            return res.status(404).json({
                ok: false,
                err: 'There are no trips registered on this moment'
            });
        }

        return res.status(200).json({
            ok: true,
            trips
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            err: 'Internal server error'
        });
    }
}

const getOneTrip = async(req, res) => {
    const { id } = req.params;

    try {
        const trip = await Trip.findByPk(id);

        if (!trip) {
            return res.status(404).json({
                ok: false,
                err: `Trip with id ${id} not found`
            });
        }

        res.status(200).json({
            ok: true,
            trip
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            err: 'Internal server error'
        });
    }
}


const createTrip = async(req, res) => {
    const { body } = req;

    try {
        const tripExists = await Trip.findOne({
            where: {
                codigoProducto: body.codigoProducto
            }
        })

        if (tripExists) {
            return res.status(404).json({
                ok: false,
                err: 'Trip already registered'
            });
        }

        const trip = await Trip.create(body);

        await trip.save();

        return res.status(200).json({
            ok: true,
            message: 'Trip created successfully'
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            err: 'Internal server error'
        });
    }
}

const updateTrip = async(req, res) => {
    const { id } = req.params;
    const { body } = req;

    try {
        const trip = await Trip.findByPk(id);

        if (!trip) {
            return res.status(404).json({
                ok: false,
                err: `Trip with id ${id} not found`
            });
        }

        await trip.update(body);

        return res.status(200).json({
            ok: 200,
            message: 'Trip updated successfully'
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            err: 'Internal server error'
        })
    }
}

const deleteTrip = async(req, res) => {
    const { id } = req.params;
    const { body } = req

    try {
        const trip = await Trip.findByPk(id);

        if (!trip) {
            return res.status(404).json({
                ok: false,
                err: `Trip with id ${id} not found`
            });
        }

        await trip.destroy(body);

        return res.status(200).json({
            ok: 200,
            message: 'Trip deleted successfully'
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            err: 'Internal server error'
        })
    }
}

module.exports = {
    getTrips,
    getOneTrip,
    createTrip,
    updateTrip,
    deleteTrip
}