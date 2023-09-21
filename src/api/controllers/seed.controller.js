const bcrypt = require('bcryptjs');

const VehiclesType = require('../models/vehicle-type');
const Vehicle = require('../models/vehicles');
const Permission = require('../models/permission');
const Privilege = require('../models/privilege');
const Role = require('../models/role');
const Company = require('../models/company');
const User = require('../models/user');
const Client = require('../models/client');

const seedDB = async(req, res) => {
    try {
        const vehicleType = await VehiclesType.create({
            nombre: "Gasolina"
        });

        await vehicleType.save();

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

        await vehicle.save();

        const privileges = await Privilege.bulkCreate([
            {
                nombre: 'actualizar',
            },
            {
                nombre: 'crear',
            },
            {
                nombre: 'eliminar',
            },
        ]);

        const permissions = await Permission.bulkCreate([
            {
                nombre: 'usuarios',
            },
            {
                nombre: 'vehiculos',
            },
            {
                nombre: 'clientes',
            },
            {
                nombre: 'compañias',
            },
            {
                nombre: 'privilegios',
            },
            {
                nombre: 'permisos',
            },
            {
                nombre: 'roles',
            },
            {
                nombre: 'tipos',
            },
            {
                nombre: 'viajes',
            },
            {
                nombre: 'cotizaciones',
            },
        ]);

        const role = await Role.create({
            nombre: 'conductor',
            permissionsId: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
            privilegesId: [1, 2, 3],
        });

        await role.save();

        const company = await Company.create({
            nit: 101010101,
            razonSocial: "Almacenes Exito",
            nombreEmpresa: "Exito",
            telefono: 2020202020,
            duenoPoliza: "EMP",
            hojaVida: "si"
        });

        await company.save();

        const client = await Client.create({
            documento: 1010101010,
            nombre: 'Jefferson',
            razonSocial: 'Coperativa Colanta',
            telefono: 3333333333
        });

        await client.save();

        const encryptedPass = bcrypt.hashSync('123456', 10);

        const user = await User.create({
            documento: 1010101010,
            edad: 28,
            email: 'carti@gmail.com',
            contrasena: encryptedPass,
            roleId: 1,
            companyId: 1,
            vehicleId: 1
        });

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