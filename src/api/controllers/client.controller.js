const Client = require('../models/client')

const getClients = async(req, res) => {
    try {
        const client = await Client.findAll();

        if (!client) {
            return res.status(404).json({
                ok: false,
                err: 'There are no clients registered on this moment'
            })
        }

        res.status(200).json({
            ok: true,
            client
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            err: 'Internal server error'
        });
    }
}


const getOneClient = async(req, res) => {
    const { id } = req.params;

    try {
        const client = await Client.findByPk(id);

        if (!client) {
            return res.status(404).json({
                ok: false,
                err: 'Client not found'
            });
        }

        res.status(200).json({
            ok: true,
            client
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            err: 'Internal server error'
        });
    }
}

const postClient = async(req, res) => {
    const { body } = req;

    try {
        const clientExists = await Client.findOne({
            where: {
                documento: body.documento
            }
        });

        if (clientExists) {
            return res.status(400).json({
                ok: false,
                message: "Client already registered"
            });
        }

        const client = await Client.create(body);
        await client.save();

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

const putClient = async(req, res) => {
    const { id } = req.params;
    const { body } = req;

    try {
        const client = await Client.findByPk(id);

        if (!client) {
            return res.status(400).json({
                ok: false,
                message: `Client with id ${id} not found`
            });
        }

        await client.update(body);

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

const deleteClient = async(req, res) => {
    const { id } = req.params;

    try {
        const client = await Client.findByPk(id);

        if (!client) {
            return res.status(400).json({
                ok: false,
                msg: `Client with id ${id} not found`
            });
        }

        await Client.destroy(id);

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