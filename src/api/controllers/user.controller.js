const bcrypt = require('bcryptjs');
const User = require('../models/user');
const Role = require('../models/role');
const Company = require('../models/company');
const Vehicle = require('../models/vehicles');

const getUsers = async(req, res) => {
    try {
        const users = await User.findAll();

        if (!users) {
            return res.status(404).json({
                ok: false,
                err: 'There are no registered users yet'
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
            err: 'Internal server error'
        });
    }
}

const getOneUser = async(req, res) => {
    const { id } = req.params;

    try {
        const user = await User.findByPk(id, { include: Role });

        if (!user) {
            return res.status(404).json({
                ok: false,
                err: `User with id ${id} not found`
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
            err: 'Internal server error'
        });
    }
}

const createUser = async(req, res) => {
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
                err: 'User already registered'
            });
        }

        const roleExists = await Role.findByPk(body.roleId);

        if (!roleExists) {
            return res.status(404).json({
                ok: false,
                err: 'Role not found'
            });
        }

        const companyExists = await Company.findByPk(body.companyId);

        if (!companyExists) {
            return res.status(404).json({
                ok: false,
                err: 'Company not found'
            });
        }

        const vehicleExists = await Vehicle.findByPk(body.roleId);

        if (!vehicleExists) {
            return res.status(404).json({
                ok: false,
                err: 'Vehicle not found'
            });
        }

        const user = await User.create(body);

        user.contrasena = bcrypt.hashSync(body.contrasena, 10);

        await user.save();

        res.status(200).json({
            ok: true,
            message: 'User created successfully'
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            err: 'Internal server error'
        });
    }
}

const updateUser = async(req, res) => {
    try {

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            err: 'Internal server error'
        });
    }
}

const deleteUser = async(req, res) => {
    const { id } = req.params;


    try {
        const user = await User.findByPk(id);

        if (!user) {
            return res.status(400).json({
                ok: false,
                msg: `User with id ${id} not found`
            });
        }
        if (user.estado) {
            await user.update({
                estado : false
            })    
        }
        else{
            await user.update({
                estado : true
            })
        }
        


        res.status(200).json({
            ok: true,
            msg: "User status change successfully"
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: "Internal server error"
        })
    }
}


module.exports = {
    getUsers,
    getOneUser,
    createUser,
    updateUser,
    deleteUser
}