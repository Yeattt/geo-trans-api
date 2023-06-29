const bcrypt = require('bcryptjs');
const User = require('../models/user');
const Role = require('../models/role');
const Company = require('../models/company');
const Vehicle = require('../models/vehicles');

const activateUser = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await User.findByPk(id);

        if (!user) {
            return res.status(404).json({
                ok: false,
                message: `Usuario con id ${id} no encontrado`
            });
        }

        if (!user.registroPendiente) {
            return res.status(400).json({
                ok: false,
                message: 'Este usuario ya se encuentra permitido para iniciar sesión en el aplicativo'
            });
        }

        await user.update({
            registroPendiente: false
        });

        await user.save();

        res.status(200).json({
            ok: true,
            message: 'Usuario permitido para iniciar sesión satisfactoriamente'
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            message: 'Internal server error'
        });
    }
}

const getUsers = async (req, res) => {
    try {
        const users = await User.findAll();

        if (!users) {
            return res.status(404).json({
                ok: false,
                message: 'No hay usuarios registrados en este momento'
            });
        }

        res.status(200).json({
            ok: true,
            users
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            message: 'Internal server error'
        });
    }
}

const getOneUser = async (req, res) => {
    const { documento } = req.params;

    try {
        const user = await User.findOne({
            where: {
                documento
            },
            include: Role
        });

        if (!user) {
            return res.status(404).json({
                ok: false,
                message: `Usuario con documento ${documento} no encontrado`
            });
        }

        res.status(200).json({
            ok: true,
            user
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            message: 'Internal server error'
        });
    }
}

const createUser = async (req, res) => {
    const { body } = req;

    try {
        const userExists = await User.findOne({
            where: {
                email: body.email
            }
        });

        if (userExists) {
            return res.status(404).json({
                ok: false,
                message: 'Ya existe un usuario registrado con ese email'
            });
        }

        const roleExists = await Role.findByPk(body.roleId);

        if (!roleExists) {
            return res.status(404).json({
                ok: false,
                message: 'Rol no encontrado'
            });
        }

        const companyExists = await Company.findByPk(body.companyId);

        if (!companyExists) {
            return res.status(404).json({
                ok: false,
                message: 'Compañía no encontrada'
            });
        }

        const vehicleExists = await Vehicle.findByPk(body.vehicleId);

        if (!vehicleExists) {
            return res.status(404).json({
                ok: false,
                message: 'Vehículo no encontrado'
            });
        }

        if (vehicleExists.enUso) {
            return res.status(400).json({
                ok: false,
                message: 'El vehículo ya se encuentra asignado a otro conductor'
            });
        }

        const user = await User.create(body);
        
        

        user.contrasena = bcrypt.hashSync(body.contrasena, 10);

        await vehicleExists.update({
            enUso: true
        });
        
        await vehicleExists.save();
        await user.save();

        res.status(200).json({
            ok: true,
            message: 'Usuario creado satisfactoriamente'
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            message: 'Internal server error'
        });
    }
}

const updateUser = async (req, res) => {
    const { id } = req.params;
    const { body } = req;

    try {
        const user = await User.findByPk(id);

        if (!user) {
            return res.status(400).json({
                ok: false,
                message: `Usuario con id ${id} no encontrado`
            });
        }

        await user.update(body);

        res.status(200).json({
            ok: true,
            message: 'Usuario actualizado satisfactoriamente'
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            message: "Internal server error"
        });
    }
}

const deleteUser = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await User.findByPk(id);

        if (!user) {
            return res.status(400).json({
                ok: false,
                message: `Usuario con id ${id} no encontrado`
            });
        }
        if (user.estado) {
            await user.update({
                estado: false
            })
        }
        else {
            await user.update({
                estado: true
            })
        }



        res.status(200).json({
            ok: true,
            message: 'Estado del usuario actualizado satisfactoriamente'
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
    activateUser,
    getUsers,
    getOneUser,
    createUser,
    updateUser,
    deleteUser
}