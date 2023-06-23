const bcrypt = require('bcryptjs');
const { generateJWT } = require('../helpers/generate-jwt');

const User = require('../models/user');

const signUp = async (req, res) => {
    const { body } = req;

    try {
        const userExists = await User.findOne({
            where: {
                email: body.email
            }
        });

        if (userExists) {
            return res.status(400).json({
                ok: false,
                message: 'Ya existe un usuario registrado con ese correo'
            });
        }

        const user = await User.create(body);

        user.contrasena = bcrypt.hashSync(body.contrasena, 10);

        await user.save();

        res.status(200).json({
            ok: true,
            message: 'Usuario registrado satisfactoriamente'
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            message: 'Internal server error'
        });
    }
}

const signIn = async (req, res) => {
    const { email, contrasena } = req.body;

    try {
        const user = await User.findOne({
            where: {
                email
            }
        });

        if (!user) {
            return res.status(400).json({
                ok: false,
                message: 'Credenciales incorrectas'
            });
        }

        if (user.registroPendiente) {
            return res.status(401).json({
                ok: false,
                message: 'Tu cuenta aún no ha sido permitida para iniciar sesión'
            });
        }

        const matchPassword = bcrypt.compareSync(contrasena, user.contrasena);

        if (!matchPassword) {
            return res.status(400).json({
                ok: false,
                message: 'Credenciales incorrectas'
            });
        }

        const token = await generateJWT(user.id, user.email);

        res.status(200).json({
            ok: true,
            uid: user.id,
            nombre: user.email,
            token
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            message: 'Internal server error'
        });
    }
}

const revalidateToken = async (req, res) => {
    const { uid, nombre } = req;

    const token = await generateJWT(uid, nombre);

    res.json({
        ok: true,
        uid, nombre,
        token
    });
}

module.exports = {
    signUp,
    signIn,
    revalidateToken
}