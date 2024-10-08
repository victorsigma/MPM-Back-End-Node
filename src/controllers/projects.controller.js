import { getConnection, sql, querys } from "../database"
import {v4 as uuidv4} from 'uuid';
import { promisify } from 'util';
import jwt  from "jsonwebtoken";


export const createNewProject = async (req, res) => {
    const { title, subtitle, src, dateStart, dateEnd } = req.body;

    const token = jwt.decode(req.token, { complete: true })

    if (
        title == null ||
        subtitle == null ||
        src == null ||
        dateStart == null ||
        dateEnd == null
    ) {
        return res.status(400).json({ 'message': 'Bad Request' });
    }

    try {
        const connection = await getConnection(); // Reemplaza con la función adecuada para obtener la conexión a MySQL
        const queryAsync = promisify(connection.query).bind(connection);

        const user = await queryAsync(querys.checkUserName, [token.payload.userName])

        const id = uuidv4()

        const toDateStart = new Date(dateStart).toISOString().slice(0, 19).replace('T', ' ');
        const toDateEnd = new Date(dateEnd).toISOString().slice(0, 19).replace('T', ' ');

        const project = await queryAsync(querys.setProject, [id, title, subtitle, src, toDateStart, toDateEnd, user[0].userId]);
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
        res.send({ 'message': error.message });
    }
}

export const getProjectById = async (req, res) => {
    const { id } = req.params;

    const token = jwt.decode(req.token, { complete: true })
    
    try {
        const connection = await getConnection(); // Reemplaza con la función adecuada para obtener la conexión a MySQL
        const queryAsync = promisify(connection.query).bind(connection);

        const user = await queryAsync(querys.checkUserName, [token.payload.userName])

        const project = await queryAsync(querys.getProjectById, [user[0].userId, id]);

        if(project.length === 0) return res.status(500).send(error.message);

        const rolId = await queryAsync(querys.getProjectUserRol, [user[0].userId, id]);

        const result = {rol: rolId[0], project: project[0]}
        

        res.json(result);
    } catch (error) {
        console.log(error)
        res.status(500).send(error.message)
    }
}


export const deleteProjectById = async (req, res) => {
    const { id } = req.params;
    try {
        const connection = await getConnection(); // Reemplaza con la función adecuada para obtener la conexión a MySQL
        const queryAsync = promisify(connection.query).bind(connection);

        await queryAsync(querys.deleteProject, [id]);

        res.sendStatus(204)
    } catch (error) {
        res.status(500);
        res.send({ 'message': error.message });
    }
}

export const updateProjectById = async (req, res) => {
    const { id } = req.params
    const { title, subtitle, src, dateStart, dateEnd } = req.body

    if (
        id == null ||
        title == null ||
        subtitle == null ||
        src == null ||
        dateStart == null ||
        dateEnd == null
    ) return res.status(400).json({'message': 'Bad Request'});


    try {
        const connection = await getConnection(); // Reemplaza con la función adecuada para obtener la conexión a MySQL
        const queryAsync = promisify(connection.query).bind(connection);

        await queryAsync(querys.updateProject, [title, subtitle, src, dateEnd, id]);

        res.status(200).send({ 'message': 'ok' });
    } catch (error) {
        console.log(error);
        res.status(500).send({ 'message': error.message });
    }
}