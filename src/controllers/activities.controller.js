import { getConnection, sql, querys } from "../database"

export const getActivities = async (req, res) => {
    try {
        const pool = await getConnection();

        const result = await pool.request().query(querys.getActivities);

        res.json(result.recordset);
    } catch (error) {
        res.status(500);
        res.send(error.message)
    }
}

export const createNewActivity = async (req, res) => {
    const { id, title, subtitle, src, status, dateEnd, leader, analyst, designer, programmer, projectId } = req.body

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
        return res.status(400).json({msg: 'Bad Request'});
    }

    try {
        const pool = await getConnection();

        await pool.request()
        .input('id', sql.VarChar, id)
        .input('title', sql.VarChar, title)
        .input('subtitle', sql.VarChar, subtitle)
        .input('src', sql.VarChar, src)
        .input('status', sql.Int, status)
        .input('dateEnd', sql.DateTime2, dateEnd)
        .input('Leader', sql.Bit, leader)
        .input('Analyst', sql.Bit, analyst)
        .input('Designer', sql.Bit, designer)
        .input('Programmer', sql.Bit, programmer)
        .input('projectId', sql.VarChar, projectId)
        .query(querys.setActivity)

        res.json(data);
    } catch (error) {
        res.status(500);
        res.send(error.message)
    }
}

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
        res.send(error.message)
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
        res.send(error.message)
    }
}

export const updateActivityById = async (req, res) => {
    const { Id } = req.params
    const { id, title, subtitle, src, status, dateEnd, leader, analyst, designer, programmer, projectId } = req.body

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
        return res.status(400).json({msg: 'Bad Request'});
    }

    try {
        const pool = await getConnection();
        await pool.request()
        .input('id', Id)
        .input('title', sql.VarChar, title)
        .input('subtitle', sql.VarChar, subtitle)
        .input('src', sql.VarChar, src)
        .input('status', sql.Int, status)
        .input('dateEnd', sql.DateTime2, dateEnd)
        .input('Leader', sql.Bit, leader)
        .input('Analyst', sql.Bit, analyst)
        .input('Designer', sql.Bit, designer)
        .input('Programmer', sql.Bit, programmer)
        .input('projectId', sql.VarChar, projectId)
        .query(querys.updateActivity);

        const result = await pool.request()
        .input('id', Id)
        .query(querys.getActivityById);

        res.json(result.recordset[0]);
    } catch (error) {
        res.status(500);
        res.send(error.message)
    }
}