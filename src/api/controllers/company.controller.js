const Company = require('../models/company')

const getCompanies = async (req, res) => {
    try {
        const companies = await Company.findAll();
        if (!companies) {
            return res.status(404).json({
                ok: false,
                message: 'No hay compañías registradas en este momento'
            })
        }

        res.status(200).json({
            ok: true,
            companies
        });
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            message: 'Internal server error'
        });
    }
}

const getOneCompany = async (req, res) => {
    const { nit } = req.params;
    try {
        const company = await Company.findOne({
            where: {
                nit
            }
        });

        if (!company) {
            return res.status(404).json({
                ok: false,
                message: `Compañía con nit ${nit} no encontrada`
            });
        }

        res.status(200).json({
            ok: true,
            company
        });
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            message: "Internal server error"
        });
    }
}

const createCompany = async (req, res) => {
    const { body } = req;
    try {
        const companyExists = await Company.findOne({
            where: {
                nit: body.nit
            }
        });
        if (companyExists) {
            return res.status(404).json({
                ok: false,
                message: 'Ya existe una compañía registrada con ese nit'
            });
        }

        const company = await Company.create(body);
        await company.save();

        res.status(200).json({
            ok: true,
            message: 'Compañía registrada satisfactoriamente'
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            message: 'Internal server error'
        })
    }
}

const updateCompany = async (req, res) => {
    const { id } = req.params;
    const { body } = req;

    try {
        const company = await Company.findByPk(id);

        if (!company) {
            return res.status(400).json({
                ok: false,
                message: `Compañía con id ${id} no encontrada`
            });
        }

        await company.update(body);

        res.status(200).json({
            ok: true,
            message: 'Compañía actualizada satisfactoriamente'
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            message: "Internal server error"
        });
    }
}

const changeStatus = async (req, res) => {
    const { id } = req.params;

    try {
        const company = await Company.findByPk(id);

        if (!company) {
            return res.status(400).json({
                ok: false,
                message: `Compañía con id ${id} no encontrada`
            });
        }
        if (company.estado) {
            await company.update({
                estado: false
            })
        }
        else {
            await company.update({
                estado: true
            })
        }

        res.status(200).json({
            ok: true,
            message: 'Estado de la compañía actualizado satisfactoriamente'
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
    getCompanies,
    getOneCompany,
    createCompany,
    updateCompany,
    changeStatus
}