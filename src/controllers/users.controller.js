import { getConnection, sql, querys } from "../database"

export const getUsers = async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request().query(querys.getUsers);
        res.json(result.recordset);
    } catch (error) {
        res.status(500);
        res.send(error.message)
    }
}

export const createNewUser = async (req, res) => {
    const { userId, userName, password, userMail, phoneNumber } = req.body

    const data = req.body;

    //console.log( userId, userName, password, userMail, phoneNumber )
    if (
        userId == null ||
        userName == null ||
        password == null ||
        userMail == null ||
        phoneNumber == null
    ) {
        return res.status(400).json({msg: 'Bad Request'});
    }

    try {
        const pool = await getConnection();

        await pool.request()
        .input('userId', sql.VarChar, userId)
        .input('userName', sql.VarChar, userName)
        .input('password', sql.VarChar, password)
        .input('userMail', sql.VarChar, userMail)
        .input('phoneNumber', sql.VarChar, phoneNumber)
        .query(querys.setUser)

        res.json(data);
    } catch (error) {
        res.status(500);
        res.send(error.message)
    }
}

export const getUserById = async (req, res) => {
    const { id } = req.params;
    try {
        const pool = await getConnection();

        const result = await pool.request()
        .input('id', id)
        .query(querys.getUserById);

        res.json(result.recordset[0]);
    } catch (error) {
        res.status(500);
        res.send(error.message)
    }
}

export const deleteUserById = async (req, res) => {
    const { id } = req.params;
    try {
        const pool = await getConnection();
        await pool.request()
        .input('id', id)
        .query(querys.deleteUser);

        res.sendStatus(204)
    } catch (error) {
        res.status(500);
        res.send(error.message)
    }
}


export const updateUserById = async (req, res) => {
    const { id } = req.params
    const { userId, userName, password, userMail, phoneNumber } = req.body

    if (
        userId == null ||
        userName == null ||
        password == null ||
        userMail == null ||
        phoneNumber == null
    ) {
        return res.status(400).json({msg: 'Bad Request'});
    }

    try {
        const pool = await getConnection();
        await pool.request()
        .input('id', id)
        .input('userName', sql.VarChar, userName)
        .input('password', sql.VarChar, password)
        .input('userMail', sql.VarChar, userMail)
        .input('phoneNumber', sql.VarChar, phoneNumber)
        .query(querys.updateUser);

        const result = await pool.request()
        .input('id', id)
        .query(querys.getUserById);

        res.json(result.recordset[0]);
    } catch (error) {
        res.status(500);
        res.send(error.message)
    }
}