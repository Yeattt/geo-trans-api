const Compania = require('../models/company')

const getCompanies = async(req, res)=>{
    try {
        const companies = await Compania.findAll();
        if(!companies){
            return res.status(404).json({
                ok: false,
                msg: "There are not registered companies"
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
            msg: "Internal server error"
        });
    }
}

const getOneCompany = async(req, res)=>{
    const { id } = req.params;
    try {
        const company = await Compania.findByPk(id)

        if (!company) {
            return res.status(404).json({
                ok: false,
                msg: "Company not found"
            })
        }

        res.status(200).json({
            ok: true,
            company
        });
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            msg: "Internal server error"
        })
    }
}

const createCompany= async(req, res)=>{
    const { body } = req;
    try {
       const companyExists = await Compania.findOne({
        where: {
            nit: body.nit
        }
       });
       if(companyExists){
        return res.status(404).json({
            ok: false,
            msg: "Company alredy registered"
        });
       }

       const company = await Compania.create(body);
       await company.save();

       res.status(200).json({
        ok: true,
        msg: "Company created successfully"
       })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            msg: "Internal server error"
        })
    }
}

module.exports = {
    getCompanies,
    getOneCompany,
    createCompany
}