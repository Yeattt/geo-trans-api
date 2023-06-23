const Client = require('../models/client')

const getClients = async (req, res) => {
    try {
        const clients = await Client.findAll();

        if (!clients) {
            return res.status(404).json({
                ok: false,
                message: 'No hay clientes registrados en este momento'
            })
        }

        res.status(200).json({
            ok: true,
            clients
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            message: 'Internal server error'
        });
    }
}


const getOneClient = async (req, res) => {
    const { documento } = req.params;

    try {
        const client = await Client.findOne({
            where: {
                documento
            }
        });

        if (!client) {
            return res.status(404).json({
                ok: false,
                message: `Cliente con documento ${documento} no encontrado`
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
            message: 'Internal server error'
        });
    }
}

const createClient = async (req, res) => {

    try {

        const { body } = req
        const clientExists = await Client.findOne({
            where: {
                documento: body.documento
            }
        });

        if (clientExists) {
            return res.status(400).json({
                ok: false,
                message: 'Ya existe un cliente registrado con ese documento'
            });
        }

        const client = await Client.create(body);
        await client.save();

        res.status(200).json({
            ok: true,
            message: 'Client registrado satisfactoriamente'
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            message: 'Internal server error'
        });
    }
}

const updateClient = async (req, res) => {
    const { id } = req.params;
    const { body } = req;

    try {
        const client = await Client.findByPk(id);

        if (!client) {
            return res.status(400).json({
                ok: false,
                message: `Client con id ${id} no encontrado`
            });
        }

        await client.update(body);

        res.status(200).json({
            ok: true,
            message: 'Client actualizado satisfactoriamente'
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
        const client = await Client.findByPk(id);

        if (!client) {
            return res.status(400).json({
                ok: false,
                message: `Client con id ${id} no encontrado`
            });
        }
        if (client.estado) {
            await client.update({
                estado: false
            })
        }
        else {
            await client.update({
                estado: true
            })
        }



        res.status(200).json({
            ok: true,
            message: "Estado de cliente actualizado satisfactoriamente"
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            message: "Internal server error"
        })
    }
}

module.exports = {
    getClients,
    getOneClient,
    createClient,
    updateClient,
    deleteClient
}