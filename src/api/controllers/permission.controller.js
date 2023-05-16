const Permission = require('../models/permission');

const getPermissions = async (req, res) => {
   try {

   } catch (error) {
      console.log(error);
      return res.status(500).json({
         ok: false,
         err: 'Internal server error'
      });
   }
}

const getOnePermission = async (req, res) => {
   try {

   } catch (error) {
      console.log(error);
      return res.status(500).json({
         ok: false,
         err: 'Internal server error'
      });
   }
}

const createPermission = async (req, res) => {
   try {

   } catch (error) {
      console.log(error);
      return res.status(500).json({
         ok: false,
         err: 'Internal server error'
      });
   }
}

const updatePermission = async (req, res) => {
   try {

   } catch (error) {
      console.log(error);
      return res.status(500).json({
         ok: false,
         err: 'Internal server error'
      });
   }
}

const deletePermission = async (req, res) => {
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
   getPermissions,
   getOnePermission,
   createPermission,
   updatePermission,
   deletePermission
}