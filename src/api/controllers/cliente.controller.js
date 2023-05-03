const Cliente = require('../models/cliente')

const getClients = async (req, res) => {
    try {
        const clientes = await Cliente.findAll();

        if (!clientes) {
            return res.status(404).json({
                ok: false,
                err: 'There are no clients registered on this moment'
            })
        }

        res.status(200).json({
            ok: true,
            clientes
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            err: 'Internal server error'
        });
    }
}


const getOneClient = async (req, res) => {
    const { id } = req.params;
    
    try {
        const cliente = await Cliente.findByPk(id);

        if (!cliente) {
            return res.status(404).json({
                ok: false,
                err: 'Client not found'
            });
        }

        res.status(200).json({
            ok: true,
            cliente
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            err: 'Internal server error'
        });
    }
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

const deleteCliente = async (req, res) => {
    const id_cliente = req.params.id
    // const eliminarCliente =await Cliente.findByIdAndDelete(id_cliente);
    const eliminarCliente = await Cliente.destroy(id_cliente)

    res.json({
        "msg": "cliente eliminado"
    })
}

module.exports = {
    getClients,
    getOneClient,
    // postCliente,
    // putCliente,
    // deleteCliente,
}