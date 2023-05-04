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

const postClient = async (req, res) => {
    const { body } = req.params;

    try {
        const clientExists = await Cliente.findOne({
            where: {
                documento: body.documento
            }
        });

        if (!clientExists) {
            return res.status(400).json({
                ok: false,
                message: "Client already registered"
            });
        }

        const cliente = await Cliente.create(body);
        await cliente.save();

        res.status(200).json({
            ok: true,
            message: 'Client created successfully'
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            message: "Internal server error"
        });
    }
}

const putClient = async (req, res) => {
    const { id } = req.params;
    const { body } = req;

    try {
        const cliente = await Cliente.findByPk(id);

        if (!cliente) {
            return res.status(400).json({
                ok: false,
                message: `Client with id ${id} not found`
            });
        }

        await cliente.update(body);

        res.status(200).json({
            ok: true,
            message: 'Client updated successfully'
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            message: "Internal server error"
        });
    }
}

const deleteClient = async (req, res) => {
    const { id } = req.params;

    try {
        const cliente = await Cliente.findByPk(id)

        if (!cliente) {
            return res.status(400).json({
                ok: false,
                msg: `Client with id ${id} not found`
            })
        }

        await Cliente.destroy(cliente);
        
        res.status(200).json({
            ok: true,
            msg: "Client deleted successfully"
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
    getClients,
    getOneClient,
    postClient,
    putClient,
    deleteClient
}