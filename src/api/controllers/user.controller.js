const bcrypt = require('bcryptjs');
const User = require('../models/user');
const Role = require('../models/role');
const Company = require('../models/company');
const Vehicle = require('../models/vehicles');
const jwt = require('jsonwebtoken');
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

const sendRecoveryPasswordEmail = async (req, res) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({
            where: {
                email
            }
        });

        if (!user) {
            return res.status(404).json({
                ok: false,
                message: `Usuario con email ${email} no encontrado`
            });
        }

        const recoveryPasswordToken = await jwt.sign({
            email: user.email,
            id: user.id
        }, process.env.SECRET_KEY, { expiresIn: '15m' });

        const linkToRecovery = `http://localhost:5173/recovery/${id}/${recoveryPasswordToken}`;

        // TODO: Envía el enlace de recuperación por correo.
        // TODO: Por ejemplo:
        // TODO: sendRecoveryEmail(email, linkToRecovery);

        res.json({
            ok: true,
            message: 'Correo electrónico de recuperación enviado correctamente'
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            message: 'Internal server error'
        });
    }
}

const recoveryPassword = async (req, res) => {
    const { id, token } = req.params;
    const { newPassword } = req.body;

    try {
        const user = await User.findByPk(id);

        if (!user) {
            return res.status(404).json({
                ok: false,
                message: 'Usuario no encontrado'
            });
        }

        jwt.verify(token, process.env.SECRET_KEY, async (err, decoded) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    message: 'Token inválido o expirado'
                });
            }

            // Comprueba si el id mandado por payload del token es válido para el usuario que quiere recuperar la contraseña.
            if (decoded.id !== user.id) {
                return res.status(400).json({
                    ok: false,
                    message: 'Token no válido para este usuario'
                });
            }

            // Actualiza la contraseña del usuario
            await user.update({ password: newPassword });

            return res.json({
                ok: true,
                message: 'Contraseña restablecida exitosamente'
            });
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            message: 'Internal server error'
        });
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