const Permission = require('../models/permission');

const getPermissions = async (req, res) => {
   try {
      const permissions = await Permission.findAll();

      if (!permissions) {
         return res.status(404).json({
            ok: false,
            message: 'No permissions registered yet'
         });
      }

      res.status(200).json({
         ok: true,
         permissions
      });
   } catch (error) {
      console.log(error);
      return res.status(500).json({
         ok: false,
         err: 'Internal server error'
      });
   }
}

const getOnePermission = async (req, res) => {
   const { nombre } = req.params;

   try {
      const permission = await Permission.findOne({
         where: {
            nombre
         }
      });

      if (!permission) {
         return res.status(404).json({
            ok: false,
            message: `Permiso con nombre ${nombre} no encontrado`
         });
      }

      res.status(200).json({
         ok: true,
         permission
      });
   } catch (error) {
      console.log(error);
      return res.status(500).json({
         ok: false,
         err: 'Internal server error'
      });
   }
}

const createPermission = async (req, res) => {
   const { body } = req;

   try {
      const existPermission = await Permission.findOne({
         where: {
            nombre: body.nombre
         }
      });

      if (existPermission) {
         return res.status(400).json({
            ok: false,
            message: 'Permission already registered with that name'
         });
      }

      const permission = await Permission.create(body);
      await permission.save();

      res.status(200).json({
         ok: true,
         message: 'Permission created successfully'
      });
   } catch (error) {
      console.log(error);
      return res.status(500).json({
         ok: false,
         err: 'Internal server error'
      });
   }
}

const updatePermission = async (req, res) => {
   const { id } = req.params;
   const { body } = req;

   try {
      const permission = await Permission.findByPk(id);

      if (!permission) {
         return res.status(404).json({
            ok: false,
            message: `Permission with id ${id} not found`
         });
      }

      await permission.update(body);

      await permission.save();

      res.status(200).json({
         ok: true,
         message: 'Permission updated successfully'
      });
   } catch (error) {
      console.log(error);
      return res.status(500).json({
         ok: false,
         err: 'Internal server error'
      });
   }
}

const deletePermission = async (req, res) => {
   const { id } = req.params;


    try {
        const permission = await Permission.findByPk(id);

        if (!permission) {
            return res.status(400).json({
                ok: false,
                msg: `Permission with id ${id} not found`
            });
        }
        if (permission.estado) {
            await permission.update({
                estado : false
            })    
        }
        else{
            await permission.update({
                estado : true
            })
        }
        


        res.status(200).json({
            ok: true,
            msg: "Permission status change successfully"
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
   getPermissions,
   getOnePermission,
   createPermission,
   updatePermission,
   deletePermission
}