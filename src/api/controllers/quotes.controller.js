const Quote = require('../models/quote')

const getQuote = async(req, res) => {
    try {
        const quotes = await Quote.findAll();

        if (!quotes) {
            return res.status(404).json({
                ok: false,
                err: 'There are no clients registered on this moment'
            });
        }

        return res.status(200).json({
            ok: true,
            quotes
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            err: 'Internal server error'
        });
    }
}

const getOneQuote = async(req, res) => {
    const { id } = req.params;

    try {
        const quote = await Quote.findByPk(id);

        if (!quote) {
            return res.status(404).json({
                ok: false,
                message: 'Quote not found'
            });
        }

        res.status(200).json({
            ok: true,
            quote
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            message: 'Internal server error'
        });
    }
}


const createQuote = async(req, res) => {
    const { body } = req;

    try {
        // const quoteExists = await Quote.findOne({
        //     where: {
        //         codigoCotizacion: body.codigoCotizacion
        //     }
        // });

        // if (quoteExists) {
        //     return res.status(400).json({
        //         ok: false,
        //         err: 'Quote already registered'
        //     });
        // }

        const quote = await Quote.create(body);
        await quote.save();

        res.status(200).json({
            ok: true,
            message: 'Quote created successfully'
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            err: 'Internal server error'
        });
    }
}

const updateQuote = async(req, res) => {
    const { id } = req.params;
    const { body } = req

    try {
        const quote = await Quote.findByPk(id);

        if (!quote) {
            return res.status(404).json({
                ok: false,
                err: `Quote with id ${id} not found`
            });
        }

        await quote.update(body);

        return res.status(200).json({
            ok: 200,
            message: 'Quote updated successfully'
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            err: 'Internal server error'
        })
    }
}

const deleteQuote = async(req, res) => {
    const { id } = req.params;
    const { body } = req

    try {
        const quote = await Quote.findByPk(id);

        if (!quote) {
            return res.status(404).json({
                ok: false,
                err: `Quote with id ${id} not found`
            });
        }

        await quote.destroy(body)

        return res.status(200).json({
            ok: 200,
            message: 'Quote destroy successfully'
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
    getQuote,
    getOneQuote,
    createQuote,
    updateQuote,
    deleteQuote
}