import { getConnection, sql, querys } from "../database"

export const getProjectsHasUsers = async (req, res) => {
    try {
        const pool = await getConnection();

        const result = await pool.request().query(querys.getProjectsHasUsers);

        res.json(result.recordset);
    } catch (error) {
        res.status(500);
        res.send(error.message)
    }
}

export const createNewProjectHasUser = async (req, res) => {
    const { Id, proyectsIdProject, userIdUser, rolesIdRol } = req.body

    //console.log( Id, proyectsIdProject, userIdUser, rolesIdRol )
    if (
        proyectsIdProject == null ||
        userIdUser == null ||
        rolesIdRol == null
    ) {
        return res.status(400).json({msg: 'Bad Request'});
    }

    try {
        const pool = await getConnection();

        await pool.request()
        .input('proyectsIdProject', sql.VarChar, proyectsIdProject)
        .input('userIdUser', sql.VarChar, userIdUser)
        .input('rolesIdRol', sql.Int, rolesIdRol)
        .query(querys.setProjectHasUser)

        const data = await pool.request().query(querys.getLastProjectsHasUsers)

        res.json(data.recordset[0]);
    } catch (error) {
        res.status(500);
        res.send(error.message)
    }
}

export const getProjectHasUserById = async (req, res) => {
    const { id } = req.params;
    try {
        const pool = await getConnection();
        const result = await pool.request()
        .input('id', id)
        .query(querys.getProjectHasUserById);

        res.json(result.recordset[0]);
    } catch (error) {
        res.status(500);
        res.send(error.message)
    }
}


export const deleteProjectHasUserById = async (req, res) => {
    const { id } = req.params;
    try {
        const pool = await getConnection();
        await pool.request()
        .input('id', id)
        .query(querys.deleteProjectHasUser);

        res.sendStatus(204)
    } catch (error) {
        res.status(500);
        res.send(error.message)
    }
}

export const updateProjectHasUserById = async (req, res) => {
    const { id } = req.params
    const { Id, proyectsIdProject, userIdUser, rolesIdRol } = req.body

    if (
        proyectsIdProject == null ||
        userIdUser == null ||
        rolesIdRol == null
    ) {
        return res.status(400).json({msg: 'Bad Request'});
    }

    try {
        const pool = await getConnection();
        await pool.request()
        .input('id', id)
        .input('proyectsIdProject', sql.VarChar, proyectsIdProject)
        .input('userIdUser', sql.VarChar, userIdUser)
        .input('rolesIdRol', sql.Int, rolesIdRol)
        .query(querys.updateProjectHasUser);

        const result = await pool.request()
        .input('id', Id)
        .query(querys.getProjectHasUserById);

        res.json(result.recordset[0]);
    } catch (error) {
        res.status(500);
        res.send(error.message)
    }
}