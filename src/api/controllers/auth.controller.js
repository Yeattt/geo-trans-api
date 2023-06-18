const bcrypt = require('bcryptjs');
const { generateJWT } = require('../helpers/generate-jwt');

const User = require('../models/user');

const signUp = async(req, res) => {
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
                err: 'User already registered'
            });
        }

        const user = await User.create(body);

        user.contrasena = bcrypt.hashSync(body.contrasena, 10);

        await user.save();

        res.status(200).json({
            ok: true,
            message: 'User registered successfully'
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            err: 'Internal server error'
        });
    }
}

const signIn = async(req, res) => {
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
                err: 'Incorrect credentials'
            });
        }

        const matchPassword = bcrypt.compareSync(contrasena, user.contrasena);

        if (!matchPassword) {
            return res.status(400).json({
                ok: false,
                err: 'Incorrect credentials'
            });
        }

        const token = await generateJWT(user.id, user.nombre);

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
            err: 'Internal server error'
        });
    }
}

module.exports = {
    signUp,
    signIn
}