import { getConnection, sql, querys } from "../database"
import {v4 as uuidv4} from 'uuid';
import { promisify } from 'util';
import jwt  from "jsonwebtoken";

export const getActivities = async (req, res) => {
    const project = req.query.project;
    const status = req.query.status;
    const token = jwt.decode(req.token, { complete: true })

    if (
        project == undefined ||
        status == undefined
    ) {
        return res.status(400).json({'message': 'Bad Request'});
    }

    try {
        const connection = await getConnection(); // Reemplaza con la función adecuada para obtener la conexión a MySQL
        const queryAsync = promisify(connection.query).bind(connection);

        const user = await queryAsync(querys.checkUserName, [token.payload.userName])

        const rolId = await queryAsync(querys.getProjectUserRol, [user[0].userId, project]);

        const rol = await queryAsync(querys.getRol, [rolId[0].idRol])

        if(status == 'all') {
            const result = await queryAsync(querys.getActivities, [project, rol[0].rolName, 1]);
    
            return res.json(result);
        }
        const result = await queryAsync(querys.getActivitiesStatus, [project, status, rol[0].rolName, 1]);

        return res.json(result);
    } catch (error) {
        console.log(error)
        res.status(500).send(error.message)
    }
}

export const getActivitiesStatus = async (req, res) => {
    try {
        const connection = await getConnection(); // Reemplaza con la función adecuada para obtener la conexión a MySQL
        const queryAsync = promisify(connection.query).bind(connection);
        const result = await queryAsync(querys.getActivitiesStatusTypes);

        return res.json(result);
    } catch (error) {
        res.status(500).send(error.message)
    }
}

export const createNewActivity = async (req, res) => {
    const { id, title, subtitle, src, status, dateEnd, leader, analyst, designer, programmer, projectId } = req.body;

    const data = req.body;
    if (
        id == null ||
        title == null ||
        subtitle == null ||
        src == null ||
        status == null ||
        dateEnd == null ||
        leader == null ||
        analyst == null ||
        designer == null ||
        programmer == null ||
        projectId == null
    ) {
        return res.status(400).json({ 'message': 'Bad Request' });
    }

    try {
        const connection = await getConnection();
        const queryAsync = promisify(connection.query).bind(connection);

        const toDateEnd = new Date(dateEnd).toISOString().slice(0, 19).replace('T', ' ');

        await queryAsync(querys.setActivity, [uuidv4(), title, subtitle, src, status, toDateEnd, leader, analyst, designer, programmer, projectId]);

        res.json(data);
    } catch (error) {
        res.status(500).send(error.message);
    }
};


export const getActivityById = async (req, res) => {
    const { id } = req.params;
    try {
        const pool = await getConnection();

        const result = await pool.request()
        .input('id', id)
        .query(querys.getActivityById);

        res.json(result.recordset[0]);
    } catch (error) {
        res.status(500);
        res.send({ 'message': error.message });
    }
}


export const deleteActivityById = async (req, res) => {
    const { id } = req.params;
    try {
        const pool = await getConnection();
        await pool.request()
        .input('id', id)
        .query(querys.deleteActivity);

        res.sendStatus(204)
    } catch (error) {
        res.status(500);
        res.send({ 'message': error.message });
    }
}

export const updateActivityById = async (req, res) => {
    const { id } = req.params
    const { title, subtitle, src, status, dateEnd, analyst, designer, programmer } = req.body

    if (id == null) return res.status(400).json({ 'message': 'Bad Request' });

    try {
        const connection = await getConnection(); // Reemplaza con la función adecuada para obtener la conexión a MySQL
        const queryAsync = promisify(connection.query).bind(connection);

        const activities = await queryAsync(querys.getActivityById, [id]);

        if(activities.length) return res.status(404).json({ 'message': 'Not Found' });

        const activity = activities[0];

        const newTitle = title !== undefined ? title : activity.title
        const newSubtitle = subtitle !== undefined ? subtitle : activity.subtitle
        const newSrc = src !== undefined ? src : activity.src
        const newStatus = status !== undefined ? status : activity.status
        const newDateEnd = dateEnd !== undefined ? dateEnd : activity.dateEnd
        const newAnalyst = analyst !== undefined ? analyst : activity.analyst
        const newDesigner = designer !== undefined ? designer : activity.designer
        const newProgrammer = programmer !== undefined ? programmer : activity.programmer

        await queryAsync(querys.updateActivity, [newTitle, newSubtitle, newSrc, newStatus, newDateEnd, newAnalyst, newDesigner, newProgrammer]);

        const result = await queryAsync(querys.getActivityById, [id]);

        res.json(result.recordset[0]);
    } catch (error) {
        res.status(500).send({ 'message': error.message });
    }
}