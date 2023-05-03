const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

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

        user.password = bcrypt.hashSync(body.password, 10);

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

// const signIn = async (req, res) => {

// }

module.exports = {
    signUp,
    // signIn
}