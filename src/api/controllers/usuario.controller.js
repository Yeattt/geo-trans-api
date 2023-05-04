const bcrypt = require('bcryptjs');
const Usuario = require('../models/usuario');

const getUsers = async (req, res) => {
   try {
      const users = await Usuario.findAll();
      
      if (!users) {
         return res.status(400).json({
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
   try {
      
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