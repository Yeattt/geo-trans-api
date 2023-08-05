const Privileges = require('../models/privigeles');


const getPrivileges = async(req, res) => {
    try {
        const privigeles = await Privileges.findAll({
            include: Privileges
        });

        if (!privigeles) {
            return res.status(404).json({
                ok: false,
                message: 'No hay privilegios registrados en este momento'
            });
        }

        res.status(200).json({
            ok: true,
            privigeles
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            message: 'Internal server error'
        });
    }
}

const getOnePrivileges = async(req, res) => {
    const { nombre } = req.params;

    try {
        const privigeles = await Privileges.findOne({
            where: {
                nombre
            },
            include: Privileges
        });

        if (!privigeles) {
            return res.status(404).json({
                ok: false,
                message: `Privilegio con nombre ${nombre} no encontrado`
            });
        }

        res.status(200).json({
            ok: true,
            privigeles
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            message: 'Internal server error'
        });
    }
}

const createPrivileges = async(req, res) => {
    const { body } = req;

    try {
        const existPrivileges = await Privileges.findOne({
            where: {
                nombre: body.nombre
            }
        })

        if (existPrivileges) {
            return res.status(400).json({
                ok: false,
                message: 'Ya existe un privilegio registrado con ese nombre'
            });
        }

        const privigeles = await Privileges.create(body);

        const privilegesToAssign = await Privileges.findAll({
            where: {
                id: body.privilegesId
            }
        });

        if (privilegesToAssign.length === 0) {
            return res.status(404).json({
                ok: false,
                message: 'No se encontraron privilegios con esos id'
            });
        }

        await privigeles.addPrivileges(privilegesToAssign);
        await privigeles.save();

        res.status(200).json({
            ok: true,
            message: 'Privilegio creado satisfactoriamente'
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            message: 'Internal server error'
        });
    }
}

const updatePrivileges = async(req, res) => {
    const { id } = req.params;
    const { body } = req;

    try {
        const privigeles = await Privileges.findByPk(id);

        if (!privigeles) {
            return res.status(404).json({
                ok: false,
                message: `Privilegios con id ${id} no encontrado`
            });
        }

        await privigeles.update(body);

        await privigeles.save();

        res.status(200).json({
            ok: true,
            message: 'Privilegios actualizado satisfactoriamente'
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            message: 'Internal server error'
        });
    }
}

const deletePrivileges = async(req, res) => {
    const { id } = req.params;

    try {
        const privigeles = await Privileges.findByPk(id);

        if (!privigeles) {
            return res.status(400).json({
                ok: false,
                message: `Privilegios con id ${id} no encontrado`
            });
        }
        if (privileges.estado) {
            await privigeles.update({
                estado: false
            })
        } else {
            await privigeles.update({
                estado: true
            })
        }



        res.status(200).json({
            ok: true,
            message: 'Estado del privilegio actualizado satisfactoriamente'
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
    getPrivileges,
    getOnePrivileges,
    createPrivileges,
    updatePrivileges,
    deletePrivileges,
}