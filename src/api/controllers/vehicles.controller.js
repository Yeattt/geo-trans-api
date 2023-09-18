const Vehicle = require('../models/vehicles');
const VehiclesType = require('../models/vehicle-type');

const getVehicle = async (req, res) => {
    try {
        const vehicles = await Vehicle.findAll({
            include: [
                {
                    model: VehiclesType,
                },
            ]
        });

        if (!vehicles) {
            return res.status(400).json({
                ok: true,
                message: 'No hay vehículos registrados en este momento'
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

const getOneVehicle = async (req, res) => {
    const { placa } = req.params;
    try {
        const vehicle = await Vehicle.findOne({
            where: {
                placa
            },
            include: [
                {
                    model: VehiclesType,
                },
            ]
        });

        if (!vehicle) {
            return res.status(400).json({
                ok: false,
                message: `Vehículo con placa ${placa} no encontrado`
            });
        }
        return res.status(200).json({
            ok: true,
            vehicles: [
                vehicle
            ]
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            ok: false,
            message: 'Internal server error'
        });

    }
}

const createVehicle = async (req, res) => {
    const { body } = req;

    try {
        const existVehicle = await Vehicle.findOne({
            where: {
                placa: body.placa,
            }
        });

        if (existVehicle) {
            return res.status(400).json({
                ok: false,
                message: 'Ya hay un vehículo registrado con esa placa'
            });
        }

        const vehicleType = await VehiclesType.findByPk(body.tipoCamion);

        if (!vehicleType) {
            return res.status(404).json({
                ok: false,
                message: 'Tipo de vehículo no encontrado'
            });
        }

        const vehicle = await Vehicle.create(body);
        await vehicle.save();

        res.status(200).json({
            ok: true,
            message: 'Vehículo registrado satisfactoriamente'
        })

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            ok: false,
            message: 'Internal server error'
        });
    }
}

// const updateVehicle = async (req, res) => {
//     const { id } = req.params;
//     const { body } = req;
//     try {
//         if (!vehicle) {
//             return res.status(400)({
//                 ok: false,
//                 message: ` Vehicle with id ${id} not found `
//             });
//         }
//         await vehicle.update(body);
//         res.status(200).json({
//             ok: true,
//             message: 'Vehicle update sucessfullys'
//         });

//     } catch (error) {
//         console.error(error);
//         return res.status(500).json({
//             ok: false,
//             message: 'Internal server error'
//         });
//     }
// }

const updateVehicle = async (req, res) => {
    const { id } = req.params;
    const { body } = req;

    try {
        const vehicle = await Vehicle.findByPk(id);

        if (!vehicle) {
            return res.status(400).json({
                ok: false,
                message: `Vehículo con id ${id} no encontrado`
            });
        }

        await vehicle.update(body);

        res.status(200).json({
            ok: true,
            message: 'Vehículo actualizado satisfactoriamente'
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            message: "Internal server error"
        });
    }
}

const deleteVehicle = async (req, res) => {
    const { id } = req.params;


    try {
        const vehicle = await Vehicle.findByPk(id);

        if (!vehicle) {
            return res.status(400).json({
                ok: false,
                message: `Vehículo con id ${id} no encontrado`
            });
        }
        if (vehicle.estado) {
            await vehicle.update({
                estado: false
            })
        }
        else {
            await vehicle.update({
                estado: true
            })
        }



        res.status(200).json({
            ok: true,
            message: 'Estado del vehículo actualizado satisfactoriamente'
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
    getVehicle,
    getOneVehicle,
    createVehicle,
    updateVehicle,
    deleteVehicle
}