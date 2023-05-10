const Vehicle = require('../models/vehicles');


const getVehicle = async(req, res) => {
    try {
        const vehicles = await Vehicle.findAll();

        if (!vehicles) {
            return res.status(400).json({
                ok: true,
                message: 'No vehicles registered'
            });
        }
        res.status(200).json({
            ok: true,
            vehicles
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            ok: false,
            message: 'Internal server error'
        });
    }
}
const createVehicle = async(req, res) => {
    const { body } = req;
    try {
        const existVehicle = await Vehicles.findOne({
            where: {
                placa: body.placa,
            }
        });
        const vehicle = await Vehicle.create(body);
        await vehicle.save();
        res.status(200).json({
            ok: true,
            message: 'Vehicle created sucessfully'
        })

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            ok: false,
            message: 'Internal server error'
        });
    }
}
const getOneVehicle = async(req, res) => {
    const { id } = req.params;
    try {
        const vehicle = await Vehicle.findByPk(id);
        if (!vehicle) {
            return res.status(400).json({
                ok: false,
                message: 'Vehicle not found'
            });
        }
        return res.status(200).json({
            ok: true,
            vehicle
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            ok: false,
            message: 'Internal server error'
        });

    }
}

const updateVehicle = async(req, res) => {
    const { id } = req.params;
    const { body } = req;
    try {
        if (!vehicle) {
            return res.status(400)({
                ok: false,
                message: ` Vehicle with id ${id} not found `
            });
        }
        await vehicle.update(body);
        res.status(200).json({
            ok: true,
            message: 'Vehicle update sucessfullys'
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            ok: false,
            message: 'Internal server error'
        });
    }
}

const deleteVehicle = async(req, res) => {
    const { id } = req.params;
    try {
        const vehicle = await Vehicle.findByPk(id);
        if (!vehicle) {
            res.status(400).json({
                ok: false,
                message: ` Vehicle with id ${id} not found `
            });
        }
        await Vehicle.destroy(id);
        res.status(200)({
            ok: true,
            message: 'Vehicle deleted sucessfully'
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            ok: false,
            message: 'Internal server error'
        });
    }
}

module.exports = {
    getVehicle,
    getOneVehicle,
    createVehicle,
    updateVehicle,
    deleteVehicle
}