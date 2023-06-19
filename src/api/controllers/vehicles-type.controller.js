const VehiclesType = require('../models/vehicle-type');

const getVehiclesType = async (req, res) => {
   try {
      const vehiclesType = await VehiclesType.findAll();

      if (!vehiclesType) {
         return res.status(400).json({
            ok: false,
            message: 'There are no vehicles type registered'
         });
      }

      res.status(200).json({
         ok: true,
         vehiclesType
      });
   } catch (error) {
      console.log(error);
      return res.status(500).json({
         ok: false,
         err: 'Internal server error'
      });
   }
}

const getOneVehicleType = async (req, res) => {
   const { nombre } = req.params;
   
   try {
      const vehicleType = await VehiclesType.findOne({
         where: {
            nombre
         }
      });

      if (!vehicleType) {
         return res.status(400).json({
            ok: false,
            message: 'Vehicle type not found'
         });
      }

      res.status(200).json({
         ok: true,
         vehicleType
      });
   } catch (error) {
      console.log(error);
      return res.status(500).json({
         ok: false,
         err: 'Internal server error'
      });
   }
}

const createVehicleType = async (req, res) => {
   const { body } = req;
   
   try {
      const existsVehicle = await VehiclesType.findOne({
         where: {
            nombre: body.nombre
         }
      });

      if (existsVehicle) {
         return res.status(400).json({
            ok: false,
            message: 'Vehicle type already registered'
         });
      }

      const vehicleType = await VehiclesType.create(body);

      await vehicleType.save();

      res.status(200).json({
         ok: true,
         message: 'Vehicle type created successfully'
      });
   } catch (error) {
      console.log(error);
      return res.status(500).json({
         ok: false,
         err: 'Internal server error'
      });
   }
}

const updateVehicleType = async (req, res) => {
   const { id } = req.params;
   const { body } = req;
   
   try {
      const vehicleType = await VehiclesType.findByPk(id);

      if (!vehicleType) {
         return res.status(400).json({
            ok: false,
            message: `Vehicle type with id ${id} not found`
         });
      }

      await vehicleType.update(body);
      await vehicleType.save();

      res.status(200).json({
         ok: true,
         message: 'Vehicle type updated successfully'
      });
   } catch (error) {
      console.log(error);
      return res.status(500).json({
         ok: false,
         err: 'Internal server error'
      });
   }
}

const deleteVehicleType = async (req, res) => {
   const { id } = req.params;
   
   try {
      const vehicleType = await VehiclesType.findByPk(id);

      if (!vehicleType) {
         return res.status(400).json({
            ok: false,
            message: `Vehicle type with id ${id} not found`
         });
      }

      if (vehicleType.estado) {
         await vehicleType.update({
            estado: false
         });
      } else {
         await vehicleType.update({
            estado: true
         });
      }

      await vehicleType.save();

      res.status(200).json({
         ok: true,
         message: 'Vehicle type status chaged successfully'
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
   createVehicleType,
   getOneVehicleType,
   getVehiclesType,
   updateVehicleType,
   deleteVehicleType
}