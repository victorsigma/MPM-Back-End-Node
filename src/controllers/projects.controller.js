import { getConnection, sql, querys } from "../database"

export const getProjects = async (req, res) => {
    try {
        const pool = await getConnection();

        const result = await pool.request().query(querys.getProjects);

        res.json(result.recordset);
    } catch (error) {
        res.status(500);
        res.send(error.message)
    }
}

export const createNewProject = async (req, res) => {
    const { id, title, subtitle, src, dateStart, dateEnd } = req.body

    const data = req.body;

    //console.log(id, title, subtitle, src, dateStart, dateEnd)
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
        .input('id', sql.VarChar, id)
        .input('title', sql.VarChar, title)
        .input('subtitle', sql.VarChar, subtitle)
        .input('src', sql.VarChar, src)
        .input('dateStart', sql.DateTime2, dateStart)
        .input('dateEnd', sql.DateTime2, dateEnd)
        .query(querys.setProject)

        res.json(data);
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