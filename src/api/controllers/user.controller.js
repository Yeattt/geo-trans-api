const bcrypt = require('bcryptjs');
const User = require('../models/user');
const Role = require('../models/role');
const Company = require('../models/company');
const Vehicle = require('../models/vehicles');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const base64url = require('base64url');
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
        const users = await User.findAll({
            include: [
                {
                    model: Vehicle
                },
                {
                    model: Role,
                },
                {
                    model: Company,
                },
            ],
        });

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
            include: [
                {
                    model: Vehicle
                },
                {
                    model: Role
                },
                {
                    model: Company
                },
            ]
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

const getOneUserById = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await User.findOne({
            where: {
                id
            },
            include: [
                {
                    model: Vehicle
                },
                {
                    model: Role
                },
            ]
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
        user.registroPendiente = false;

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
        } else {
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
    const { id } = req.params;

    try {
        const user = await User.findOne({
            where: {
                email,
            },
        });

        if (!user) {
            return res.status(404).json({
                ok: false,
                message: `Usuario con email ${email} no encontrado`,
            });
        }

        const recoveryPasswordToken = jwt.sign({
            email: user.email,
            id: user.id,
        },
            process.env.SECRET_KEY, { expiresIn: '5m' }
        );
        const shortenedToken = base64url.encode(recoveryPasswordToken)

        const linkToRecovery = `http://localhost:5173/auth/recovery/${user.id}/${shortenedToken}`;

        // Envía el enlace de recuperación por correo.
        try {


            const transporter = nodemailer.createTransport({
                service: 'Gmail', // o el servidor SMTP que estés utilizando
                auth: {
                    user: process.env.EMAIL,
                    pass: process.env.PASSWORD,
                },
            });

            transporter.verify().then(() => {
                console.log('Ready for send emails');
            })

            await transporter.sendMail({
                from: `"Forgot password" <${process.env.EMAIL}>`,
                to: email, // Aquí usamos la dirección de correo del usuario
                subject: "Forgot password",
                html: `<b>Please click on the following link, or paste this into your browser to complete the process:</b>
              <a href="${linkToRecovery}">${linkToRecovery}</a>`,
            });

            console.log('Correo enviado correctamente: ', linkToRecovery);

            res.json({
                ok: true,
                message: 'Correo electrónico de recuperación enviado correctamente',
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                ok: false,
                message: 'Error al enviar el correo de recuperación'
            });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            message: 'Internal server error'
        });
    }
}

const recoveryPassword = async (req, res) => {
    const { id } = req.params;
    let { token } = req.params;
    const { newPassword } = req.body;
    try {
        const user = await User.findByPk(id);

        if (!user) {
            return res.status(404).json({
                ok: false,
                message: 'Usuario no encontrado'
            });
        }

        token = base64url.decode(token);

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
            contrasena = bcrypt.hashSync(newPassword, 10);
            await user.update({ contrasena: contrasena });

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
    getOneUserById,
    createUser,
    updateUser,
    deleteUser,
    sendRecoveryPasswordEmail,
    recoveryPassword

}