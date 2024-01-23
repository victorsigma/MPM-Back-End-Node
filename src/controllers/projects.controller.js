import { getConnection, sql, querys } from "../database"
import {v4 as uuidv4} from 'uuid';
import { promisify } from 'util';
import jwt  from "jsonwebtoken";


export const createNewProject = async (req, res) => {
    const { title, subtitle, src, dateStart, dateEnd } = req.body;

    const token = jwt.decode(req.token, { complete: true })
    /*      id: 0,
      proyectsIdProject: this.project.id,
      userIdUser: '',
      rolesIdRol: 0*/
    if (
        title == null ||
        subtitle == null ||
        src == null ||
        dateStart == null ||
        dateEnd == null
    ) {
        return res.status(400).json({ msg: 'Bad Request' });
    }

    try {
        const connection = await getConnection(); // Reemplaza con la función adecuada para obtener la conexión a MySQL
        const queryAsync = promisify(connection.query).bind(connection);

        const user = await queryAsync(querys.checkUserName, [token.payload.userName])

        const id = uuidv4()

        const project = await queryAsync(querys.setProject, [id, title, subtitle, src, dateStart, dateEnd, user[0].userId]);
        await queryAsync(querys.setProjectHasUser, [id, user[0].userId, 0]
        );

        res.json(project);
    } catch (error) {
        console.log(error)
        res.status(500).send(error.message);
    }
};

export const getProjects = async (req, res) => {

    const token = jwt.decode(req.token, { complete: true })

    try {
        const connection = await getConnection(); // Reemplaza con la función adecuada para obtener la conexión a MySQL
        const queryAsync = promisify(connection.query).bind(connection);

        const user = await queryAsync(querys.checkUserName, [token.payload.userName])

        const result = await queryAsync(querys.getProjects, [user[0].userId]);

        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message)
    }
}

export const getProjectById = async (req, res) => {
    const { id } = req.params;
    try {
        const pool = await getConnection();

        const result = await pool.request()
        .input('id', id)
        .query(querys.getProjectById);

        res.json(result.recordset[0]);
    } catch (error) {
        res.status(500);
        res.send(error.message)
    }
}


export const deleteProjectById = async (req, res) => {
    const { id } = req.params;
    try {
        const pool = await getConnection();
        await pool.request()
        .input('id', id)
        .query(querys.deleteProject);

        res.sendStatus(204)
    } catch (error) {
        res.status(500);
        res.send(error.message)
    }
}

export const updateProjectById = async (req, res) => {
    const { Id } = req.params
    const { id, title, subtitle, src, dateStart, dateEnd } = req.body

    if (
        id == null ||
        title == null ||
        subtitle == null ||
        src == null ||
        dateStart == null ||
        dateEnd == null
    ) {
        return res.status(400).json({msg: 'Bad Request'});
    }

    try {
        const pool = await getConnection();
        await pool.request()
        .input('id', Id)
        .input('title', sql.VarChar, title)
        .input('subtitle', sql.VarChar, subtitle)
        .input('src', sql.VarChar, src)
        .input('dateEnd', sql.DateTime2, dateEnd)
        .query(querys.updateProject);

        const result = await pool.request()
        .input('id', Id)
        .query(querys.getProjectById);

        res.json(result.recordset[0]);
    } catch (error) {
        res.status(500);
        res.send(error.message)
    }
}