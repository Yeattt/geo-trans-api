const Role = require('../models/role');
const Permission = require('../models/permission');
const Privilege = require('../models/privilege');

const assignPermissionsToRole = async (req, res) => {
    const { id } = req.params;
    const { permissionsId } = req.body;

    try {
        const role = await Role.findByPk(id, {
            include: [
                {
                    model: Permission
                }
            ]
        });

        if (!role) {
            return res.status(404).json({
                ok: false,
                message: `Rol con id ${id} no encontrado`
            });
        }

        if (permissionsId.length == 0) {
            await role.setPermisos([]);
            await role.save();

            return res.status(200).json({
                ok: true,
                message: 'Todos los permisos eliminados satisfactoriamente'
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

        await role.setPermisos(permissionsToAssign);
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

const assignPrivilegesToRole = async (req, res) => {
    const { id } = req.params;
    const { privilegesId } = req.body;

    try {
        const role = await Role.findByPk(id);

        if (!role) {
            return res.status(404).json({
                ok: false,
                message: `Rol con id ${id} no encontrado`
            });
        }

        if (privilegesId.length == 0) {
            await role.setPrivilegios([]);
            await role.save();

            return res.status(200).json({
                ok: true,
                message: 'Todos los privilegios eliminados satisfactoriamente'
            });
        }

        const privilegesToAssign = await Privilege.findAll({
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

        await role.setPrivilegios(privilegesToAssign);
        await role.save();

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

const getRoles = async (req, res) => {
    try {
        const roles = await Role.findAll({
            include: [
                {
                    model: Permission
                },
                {
                    model: Privilege
                }
            ],
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

const getOneRole = async (req, res) => {
    // const { nombre } = req.params;
    const { id } = req.params;

    try {
        // const role = await Role.findOne({
        //     where: {
        //         nombre
        //     },
        //     include: Permission
        // });

        const role = await Role.findByPk(id, {
            include: [
                {
                    model: Permission
                },
                {
                    model: Privilege
                }
            ]
        });

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

const createRole = async (req, res) => {
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

        if (body.permissionsId.length == 0) {
            await role.setPermisos([]);
            await role.save();

            return res.status(200).json({
                ok: true,
                message: 'Rol creado satisfactoriamente'
            });
        }

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

        await role.setPermisos(permissionsToAssign);
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

const updateRole = async (req, res) => {
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

const deleteRole = async (req, res) => {
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