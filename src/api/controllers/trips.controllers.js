const Trip = require('../models/trips')

const getTrips = async(req, res) => {
    try {
        const trips = await Trip.findAll();

        if (!trips) {
            return res.status(404).json({
                ok: false,
                err: 'There are no clients registered on this moment'
            });
        }

        return res.status(200).json({
            ok: true,
            prices
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            err: 'Internal server error'
        });
    }
}

const getOnetrip = async(req, res) => {
    const { id } = req.params;

    try {
        const trip = await Trip.findByPk(id);

        if (!trip) {
            return res.status(404).json({
                ok: false,
                message: 'trip not found'
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
            message: 'Internal server error'
        });
    }
}


const createtrip = async(req, res) => {
    const { body } = req;

    try {
        const tripExists = await Trip.findOne({
            where: {
                codigoCotizacion: body.codigoCotizacion
            }
        })

        if (tripExists) {
            return res.status(404).json({
                ok: false,
                err: 'User already registered'
            });
        }

        const trip = await Trip.create(body);
        await trip.save();

        return res.status(200).json({
            ok: true,
            message: 'Price created successfully'
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            err: 'Internal server error'
        });
    }
}

const updatetrip = async(req, res) => {
    const { id } = req.params;
    const { body } = req


    try {
        const trip = await Trip.findByPk(id);

        if (!trip) {
            return res.status(404).json({
                ok: false,
                err: `trip with id ${id} not found`
            });
        }

        await trip.update(body);

        return res.status(200).json({
            ok: 200,
            message: 'Price updated successfully'
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            err: 'Internal server error'
        })
    }
}

const deletetrip = async(req, res) => {
    const { id } = req.params;
    const { body } = req

    try {
        const trip = await Trip.findByPk(id);

        if (!trip) {
            return res.status(404).json({
                ok: false,
                err: `Price with id ${id} not found`
            });
        }

        await trip.destroy(body)

        return res.status(200).json({
            ok: 200,
            message: 'Price destroy successfully'
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
    getOnetrip,
    createtrip,
    updatetrip,
    deletetrip
}