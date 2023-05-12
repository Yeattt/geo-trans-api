const Price = require('../models/price')

const getPrice = async(req, res) => {
    try {
        const prices = await Price.findAll();

        if (!prices) {
            return res.status(404).json({
                ok: false,
                err: 'There are no clients registered on this moment'
            });
        }

        return res.status(200).json({
            ok: true,
            prices
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            err: 'Internal server error'
        });
    }
}

const getOnePrice = async(req, res) => {
    const { id } = req.params;

    try {
        const price = await Price.findByPk(id);

        if (!price) {
            return res.status(404).json({
                ok: false,
                message: 'Price not found'
            });
        }

        res.status(200).json({
            ok: true,
            price
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            message: 'Internal server error'
        });
    }
}


const createPrice = async(req, res) => {
    const { body } = req;

    try {
        const priceExists = await Price.findOne({
            where: {
                codigoCotizacion: body.codigoCotizacion
            }
        })

        if (priceExists) {
            return res.status(404).json({
                ok: false,
                err: 'User already registered'
            });
        }

        const price = await Price.create(body);
        await price.save();

        return res.status(200).json({
            ok: true,
            message: 'Price created successfully'
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            err: 'Internal server error'
        });
    }
}

const updatePrice = async(req, res) => {
    const { id } = req.params;
    const { body } = req


    try {
        const price = await Price.findByPk(id);

        if (!price) {
            return res.status(404).json({
                ok: false,
                err: `Price with id ${id} not found`
            });
        }

        await price.update(body);

        return res.status(200).json({
            ok: 200,
            message: 'Price updated successfully'
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            err: 'Internal server error'
        })
    }
}

const deletePrice = async(req, res) => {
    const { id } = req.params;
    const { body } = req

    try {
        const price = await Price.findByPk(id);

        if (!price) {
            return res.status(404).json({
                ok: false,
                err: `Price with id ${id} not found`
            });
        }

        await price.destroy(body)

        return res.status(200).json({
            ok: 200,
            message: 'Price destroy successfully'
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            err: 'Internal server error'
        })
    }
}

module.exports = {
    getPrice,
    getOnePrice,
    createPrice,
    updatePrice,
    deletePrice
}