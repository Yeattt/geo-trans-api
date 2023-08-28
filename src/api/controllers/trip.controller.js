const Trip = require('../models/trips')

const getTrips = async(req, res) => {
    try {
        const trips = await Trip.findAll();

        if (!trips) {
            return res.status(404).json({
                ok: false,
                message: 'No hay viajes registrados en este momento'
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
            message: 'Internal server error'
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
                message: `Viaje con id ${id} no encontrado`
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


const createTrip = async(req, res) => {
    const { body } = req;

    try {
        // const tripExists = await Trip.findOne({
        //     where: {
        //         nombreProducto: body.nombreProducto
        //     }
        // })

        // if (tripExists) {
        //     return res.status(404).json({
        //         ok: false,
        //         message: 'Ya hay un viaje registrado con ese nombre de producto'
        //     });
        // }

        const trip = await Trip.create(body);

        await trip.save();

        return res.status(200).json({
            ok: true,
            message: 'Viaje registrado satisfactoriamente'
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            message: 'Internal server error'
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
                message: `Viaje con id ${id} no encontrado`
            });
        }

        await trip.update(body);

        return res.status(200).json({
            ok: 200,
            message: 'Viaje actualizado satisfactoriamente'
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            message: 'Internal server error'
        })
    }
}

const deleteTrip = async(req, res) => {
    const { id } = req.params;


    try {
        const trip = await Trip.findByPk(id);

        if (!trip) {
            return res.status(400).json({
                ok: false,
                message: `Viaje con id ${id} no encontrado`
            });
        }
        if (trip.estado) {
            await trip.update({
                estado: false
            })
        } else {
            await trip.update({
                estado: true
            })
        }



        res.status(200).json({
            ok: true,
            message: 'Estado del viaje actualizado satisfactoriamente'
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            message: "Internal server error"
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