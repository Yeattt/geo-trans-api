const Role = require('../models/role');
const Permission = require('../models/permission');

const assignPermissionsToRole = async(req, res) => {
    const { id } = req.params;
    const { permissionsId } = req.body;

    try {
        const role = await Role.findByPk(id);

        if (!role) {
            return res.status(404).json({
                ok: false,
                message: `Rol con id ${id} no encontrado`
            });
        }

        const permissionsToAssign = await Permission.findAll({
            where: {
                id: permissionsId
            }
        });

        if (permissionsToAssign.length === 0) {
            return res.status(404).json({
                ok: false,
                message: 'No se encontraron permisos con esos id'
            });
        }

        await role.addPermiso(permissionsToAssign);
        await role.save();

        res.status(200).json({
            ok: true,
            message: 'Permisos asignados satisfactoriamente'
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            message: 'Internal server error'
        });
    }
}

const  assignPrivilegesToRole = async(req, res) => {
    const { id } = req.params;
    const { privilegesId } = req.body;

    try {
        const privileges = await Privileges.findByPk(id);

        if (!privileges) {
            return res.status(404).json({
                ok: false,
                message: `Privilegio con id ${id} no encontrado`
            });
        }

        const privilegesToAssign = await Privileges.findAll({
            where: {
                id: privilegesId
            }
        });

        if (privilegesToAssign.length === 0) {
            return res.status(404).json({
                ok: false,
                message: 'No se encontraron privilegios con esos id'
            });
        }

        await privileges.addPrivileges(privilegesToAssign);
        await privileges.save();

        res.status(200).json({
            ok: true,
            message: 'Privilegios asignados satisfactoriamente'
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            message: 'Internal server error'
        });
    }
}

const getRoles = async(req, res) => {
    try {
        const roles = await Role.findAll({
            include: Permission
        });

        if (!roles) {
            return res.status(404).json({
                ok: false,
                message: 'No hay roles registrados en este momento'
            });
        }

        res.status(200).json({
            ok: true,
            roles
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            message: 'Internal server error'
        });
    }
}

const getOneRole = async(req, res) => {
    // const { nombre } = req.params;
    const { id } = req.params;

    try {
        // const role = await Role.findOne({
        //     where: {
        //         nombre
        //     },
        //     include: Permission
        // });

        const role = await Role.findByPk(id);

        if (!role) {
            return res.status(404).json({
                ok: false,
                message: `Rol con nombreo o id ${id} no encontrado`
            });
        }

        res.status(200).json({
            ok: true,
            role
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            message: 'Internal server error'
        });
    }
}

const createRole = async(req, res) => {
    const { body } = req;

    try {
        const existRole = await Role.findOne({
            where: {
                nombre: body.nombre
            }
        })

        if (existRole) {
            return res.status(400).json({
                ok: false,
                message: 'Ya existe un rol registrado con ese nombre'
            });
        }

        const role = await Role.create(body);

        const permissionsToAssign = await Permission.findAll({
            where: {
                id: body.permissionsId
            }
        });

        if (permissionsToAssign.length === 0) {
            return res.status(404).json({
                ok: false,
                message: 'No se encontraron permisos con esos id'
            });
        }

        await role.addPermiso(permissionsToAssign);
        await role.save();

        res.status(200).json({
            ok: true,
            message: 'Rol creado satisfactoriamente'
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            message: 'Internal server error'
        });
    }
}

const updateRole = async(req, res) => {
    const { id } = req.params;
    const { body } = req;

    try {
        const role = await Role.findByPk(id);

        if (!role) {
            return res.status(404).json({
                ok: false,
                message: `Rol con id id ${id} no encontrado`
            });
        }

        await role.update(body);

        await role.save();

        res.status(200).json({
            ok: true,
            message: 'Rol actualizado satisfactoriamente'
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            message: 'Internal server error'
        });
    }
}

const deleteRole = async(req, res) => {
    const { id } = req.params;

    try {
        const role = await Role.findByPk(id);

        if (!role) {
            return res.status(400).json({
                ok: false,
                message: `Rol con id ${id} no encontrado`
            });
        }
        if (role.estado) {
            await role.update({
                estado: false
            })
        } else {
            await role.update({
                estado: true
            })
        }



        res.status(200).json({
            ok: true,
            message: 'Estado del rol actualizado satisfactoriamente'
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
    assignPermissionsToRole,
    assignPrivilegesToRole,
    getRoles,
    getOneRole,
    createRole,
    updateRole,
    deleteRole,
}