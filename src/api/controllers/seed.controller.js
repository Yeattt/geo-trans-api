const VehiclesType = require('../models/vehicle-type');
const Vehicle = require('../models/vehicles');
const Permission = require('../models/permission');
const Role = require('../models/role');
const Company = require('../models/company');
const User = require('../models/user');

const seedDB = async (req, res) => {
  try {
    const vehicleType = await VehiclesType.create({
      nombre: "Gasolina"
    });

    const vehicle = await Vehicle.create({
      modelo: 2019,
      marca: "Mercedez",
      placa: "ZIO342",
      placaSemirremolque: "AZD234",
      tarjetaPropiedad: "si",
      tecnomecanica: "si",
      soat: "si",
      tipoCamion: 1
    });

    const permission = await Permission.create({
      nombre: "Actualizar"
    });

    const role = await Role.create({
      nombre: "Administrador",
      permissionsId: [1]
    });

    const company = await Company.create({
      nit: 1010101010,
      razonSocial: "si",
      nombreEmpresa: "Gangsta INC",
      telefono: 2020202020,
      duenoPoliza: "yo"
    });

    const user = await User.create({
      documento: 1010101010,
      edad: 12,
      email: "carti@gmail.com",
      contrasena: "123456",
      roleId: 1,
      companyId: 1,
      vehicleId: 1
    });

    await vehicleType.save();
    await vehicle.save();
    await permission.save();
    await role.save();
    await company.save();
    await user.save();

    res.status(200).json({
      ok: true,
      message: 'DB filled successfully'
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      message: 'Internal server error'
    });
  }
}

module.exports = {
  seedDB
}