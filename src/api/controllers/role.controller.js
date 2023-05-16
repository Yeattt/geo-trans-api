const Role = require('../models/role');
const Permission = require('../models/permission');

const getRoles = async (req, res) => {
   try {
      const roles = await Role.findAll();

      if (!roles) {
         return res.status(404).json({
            ok: false,
            err: 'There are no roles registered'
         });
      }

      res.status(200).json({
         ok: true,
         roles
      });
   } catch (error) {
      console.log(error);
      return res.status(500).json({
         ok: false,
         err: 'Internal server error'
      });
   }
}

const getOneRole = async (req, res) => {
   try {
      
   } catch (error) {
      console.log(error);
      return res.status(500).json({
         ok: false,
         err: 'Internal server error'
      });
   }
}

const createRole = async (req, res) => {
   const { body } = req;
   const { permissions } = body;

   try {
      const role = await Role.findOne({
         where: {
            nombre: body.nombre
         }
      });

      if (role) {
         return res.status(400).json({
            ok: false,
            err: 'Role already registered'            
         });
      }

      const existPermissions = await Permission.findAll({
         where: {
            id: permissions
         }
      });

      if (!existPermissions) {
         return res.status(404).json({
            ok: false,
            err: 'No permissions found'
         });
      }

      
   } catch (error) {
      console.log(error);
      return res.status(500).json({
         ok: false,
         err: 'Internal server error'
      });
   }
}

const updateRole = async (req, res) => {
   try {
      
   } catch (error) {
      console.log(error);
      return res.status(500).json({
         ok: false,
         err: 'Internal server error'
      });
   }
}

const deleteRole = async (req, res) => {
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
   getRoles,
   getOneRole,
   createRole,
   updateRole,
   deleteRole
}