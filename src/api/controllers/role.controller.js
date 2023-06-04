const Role = require('../models/role');
const Permission = require('../models/permission');

const assignPermissionsToRole = async (req, res) => {
   const { id } = req.params;
   const { permissionsId } = req.body;

   try {
      const role = await Role.findByPk(id);

      if (!role) {
         return res.status(404).json({
            ok: false,
            message: `No role with id ${id} found`
         });
      }

      const permissionsToAssign = await Permission.findAll({
         where: {
            id: permissionsId
         }
      });

      if (permissionsToAssign.length === 0) {
         return res.status(404).json({
            ok: false,
            message: 'No permissions were found with these ids'
         });
      }

      await role.addPermiso(permissionsToAssign);
      await role.save();

      res.status(200).json({
         ok: true,
         message: 'Permissions assigned successfully'
      });
   } catch (error) {
      console.log(error);
      return res.status(500).json({
         ok: false,
         err: 'Internal server error'
      });
   }
}

const getRoles = async (req, res) => {
   try {
      const roles = await Role.findAll();

      if (!roles) {
         return res.status(404).json({
            ok: false,
            message: 'There are no roles registered'
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
   const { id } = req.params;

   try {
      const role = await Role.findOne({
         where: { id: id },
         include: Permission
      });

      if (!role) {
         return res.status(404).json({
            ok: false,
            message: `No role found with id ${id}`
         });
      }

      res.status(200).json({
         ok: true,
         role
      });
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

   try {
      const existRole = await Role.findOne({
         where: {
            nombre: body.nombre
         }
      })

      if (existRole) {
         return res.status(400).json({
            ok: false,
            message: 'Role already registered with that name'
         });
      }

      const role = await Role.create(body);
      await role.save();

      res.status(200).json({
         ok: true,
         message: 'Role created successfully'
      });
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
   assignPermissionsToRole,
   getRoles,
   getOneRole,
   createRole,
   updateRole,
   deleteRole,
}