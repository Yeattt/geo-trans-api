const Company = require('../models/company')

const getCompanies = async(req, res)=>{
    try {
        const companies = await Company.findAll();
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
        const company = await Company.findByPk(id)

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
       const companyExists = await Company.findOne({
        where: {
            nit: body.nit
        }
       });
       if(companyExists){
        return res.status(404).json({
            ok: false,
            msg: "Company already registered"
        });
       }

       const company = await Company.create(body);
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

const updateCompany = async(req, res) => {
    const { id } = req.params;
    const { body } = req;

    try {
        const company = await Company.findByPk(id);

        if (!company) {
            return res.status(400).json({
                ok: false,
                msg: `Company with id ${id} not found`
            });
        }

        await company.update(body);

        res.status(200).json({
            ok: true,
            msg: 'Company updated successfully'
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: "Internal server error"
        });
    }
}

const changeStatus = async(req, res) => {
    const { id } = req.params;


    try {
        const company = await Company.findByPk(id);

        if (!company) {
            return res.status(400).json({
                ok: false,
                msg: `Company with id ${id} not found`
            });
        }
        if (company.estado) {
            await company.update({
                estado : false
            })    
        }
        else{
            await company.update({
                estado : true
            })
        }
        


        res.status(200).json({
            ok: true,
            msg: "Company status change successfully"
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
    getCompanies,
    getOneCompany,
    createCompany,
    updateCompany,
    changeStatus
}