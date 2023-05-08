const bcrypt = require('bcryptjs');
const User = require('../models/user');
const Role = require('../models/role');

const getUsers = async (req, res) => {
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

const getOneUser = async (req, res) => {
   const { id } = req.params;

   try {

   } catch (error) {
      console.log(error);
      return res.status(500).json({
         ok: false,
         err: 'Internal server error'
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
            err: 'User already registered'
         });
      }

      const roleExists = await Rol.findByPk(body.rolId);

      if (!roleExists) {
         return res.status(404).json({
            ok: false,
            err: 'Rol not found'
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

const updateUser = async (req, res) => {
   try {

   } catch (error) {
      console.log(error);
      return res.status(500).json({
         ok: false,
         err: 'Internal server error'
      });
   }
}

module.exports = {
   getUsers,
   getOneUser,
   createUser,
   updateUser
}