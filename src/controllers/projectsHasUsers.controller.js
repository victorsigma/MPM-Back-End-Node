import { getConnection, sql, querys } from "../database"
import { promisify } from 'util';

export const getProjectsHasUsers = async (req, res) => {
    const project = req.query.project;

    try {
        const connection = await getConnection(); // Reemplaza con la función adecuada para obtener la conexión a MySQL
        const queryAsync = promisify(connection.query).bind(connection);

        const result = await queryAsync(querys.getProjectsHasUsers, [project]);

        res.json(result);
    } catch (error) {
        res.status(500);
        res.send({ 'message': error.message });
    }
}

export const createNewProjectHasUser = async (req, res) => {
    const { idProject, userNameOrEmail, idRol } = req.body

    //console.log( Id, proyectsIdProject, userIdUser, rolesIdRol )
    if (
        idProject == null ||
        userNameOrEmail == null ||
        idRol == null
    ) {
        return res.status(400).json({'message': 'Bad Request'});
    }

    try {
        const connection = await getConnection(); // Reemplaza con la función adecuada para obtener la conexión a MySQL
        const queryAsync = promisify(connection.query).bind(connection);

        const validEmail = /^([\da-z_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/.test(userNameOrEmail)
        let checkUser;
        if(validEmail) {
            //checkUser = await pool.request().input('userMail', sql.VarChar, userNameOrEmail).query(querys.checkEmail);
            checkUser = await queryAsync(querys.checkEmail, [userNameOrEmail])
        } else {
            checkUser = await queryAsync(querys.checkUserName, [userNameOrEmail]);
        }
        

        if(checkUser[0] != undefined) {
            const checkMember = await queryAsync(querys.checkRol, [checkUser[0].userId, idProject])

            if(checkMember[0] != undefined) return res.sendStatus(400)
            await queryAsync(querys.setProjectHasUser, [idProject, checkUser[0].userId , idRol])
            const data = await queryAsync(querys.getLastProjectsHasUsers)

            return res.json(data[0]);
        } else {
            return res.status(404).send({msj: 'Not Found'})
        }
        
    } catch (error) {
        res.status(500).send(error.message)
    }
}

export const getProjectHasUserById = async (req, res) => {
    const { id } = req.params;
    const project = req.query.project;

    try {
        const connection = await getConnection(); // Reemplaza con la función adecuada para obtener la conexión a MySQL
        const queryAsync = promisify(connection.query).bind(connection);

        const result = await queryAsync(querys.getProjectHasUserById, [id, project]);

        res.json(result.recordset[0]);
    } catch (error) {
        res.status(500);
        res.send({ 'message': error.message });
    }
}


export const deleteProjectHasUserById = async (req, res) => {
    const user = req.query.user;
    const project = req.query.project;
    try {
        const connection = await getConnection(); // Reemplaza con la función adecuada para obtener la conexión a MySQL
        const queryAsync = promisify(connection.query).bind(connection);

        const checkUser = await queryAsync(querys.checkUserName, [user]);

        const checkRol = await queryAsync(querys.checkRol, [checkUser[0].userId, project]);

        if(checkRol[0].idRol == 0) return res.sendStatus(400)
        
        await queryAsync(querys.deleteProjectHasUser, [checkUser[0].userId, project]);
        return res.sendStatus(204)
    } catch (error) {
        res.status(500);
        res.send({ 'message': error.message });
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
        return res.status(400).json({'message': 'Bad Request'});
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
        res.send({ 'message': error.message });
    }
}