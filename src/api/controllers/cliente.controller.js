const Cliente = require('../models/cliente')

const getCliente = async(req, res) => {
    const allClientes = await Cliente.findAll({ attributes: ['Documento', 'DuenoPoliza', 'Nombre', 'RazonSocial', 'Telefono'] })
        .then(clientes => {
            console.log(clientes.toJSON())
        })
        .catch(err => {
            console.log(err)
        })

    res.json({
        "ok": 200,
        msg: "getCliente",
        allClientes
    })
}


const getClienteOne = async(req, res) => {
    const { id } = req.params;
    const oneCliente = await Cliente.findByPk(id)

    if (!oneCliente) {
        return res.status(404).json({
            ok: false,
            msg: `cliente con el id ${id} no existe.`
        })
    }

    res.json({
        msg: "getClienteOne",
        oneCliente
    })
}

// const postCliente = async (req, res) => {
//     const {identificacion ,Nombre, Apellido, Direccion, Numero, Estado, Contraseña, Email }= req.body;

//     const Clientes = await new Cliente({identificacion ,Nombre, Apellido, Direccion, Numero, Estado, Contraseña, Email });

//     const salt = contraseña.genSaltSync();

//     Clientes.Contraseña = contraseña.hashSync(Contraseña, salt);

//     Clientes.save();

//     res.json({
//         "ok" : 200,
//         Clientes
//     })
// }

// const putCliente =async (req, res) => {
//     const id_Cliente = req.params.id;

//     const {identificacion ,Nombre, Apellido, Direccion, Numero, Estado, Contraseña, Email }= req.body;

//     const ClienteActualizado = await Cliente.findByIdAndUpdate(id_Cliente, {identificacion ,Nombre, Apellido, Direccion, Numero, Estado, Contraseña, Email })

//     const salt = contraseña.genSaltSync();

//     ClienteActualizado.Contraseña = contraseña.hashSync(Contraseña, salt);

//     ClienteActualizado.save();

//     res.json({
//         "ok" : 200,
//         ClienteActualizado
//     })
// }

const deleteCliente = async(req, res) => {
    const id_cliente = req.params.id
        // // const eliminarCliente =await Cliente.findByIdAndDelete(id_cliente);
    const eliminarCliente = await Cliente.destroy(id_cliente)

    res.json({
        "msg": "cliente eliminado"
    })
}

module.exports = {
    getCliente,
    getClienteOne,
    // postCliente,
    // putCliente,
    // deleteCliente,
}