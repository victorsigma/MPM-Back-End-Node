import { getConnection, sql, querys } from "../database";
import {v4 as uuidv4} from 'uuid';
import bcrypt from "bcrypt";
import jwt  from "jsonwebtoken";

export const login = async (req, res) => {
    const { userNameOrEmail, password } = req.body

    if( userNameOrEmail == null || password == null) return res.status(400).send({msg: 'Bad Request'});

    try {
        const pool = await getConnection()

        const validEmail = /^([\da-z_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/.test(userNameOrEmail)
        let checkUser;
        if(validEmail) {
            checkUser = await pool.request().input('userMail', sql.VarChar, userNameOrEmail).query(querys.checkEmail);
        } else {
            checkUser = await pool.request().input('userName', sql.VarChar, userNameOrEmail).query(querys.checkUserName);
        }

        const user = checkUser.recordset[0];

        if(checkUser != undefined) {
            bcrypt.compare(password, user.password).then((result) => {
                if(result) {
                    const token = jwt.sign({
                        userName: user.userName,
                        userMail: user.userMail,
                        phoneNumber: user.phoneNumber

                    }, '77767b40-fedc-11ec-b939-0242ac120002')
                    res.json({ token })
                } else {
                    res.json({ msg: 'Incorrect password' })
                }
            })
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
}


export const createNewUser = async (req, res) => {
    const { userId, userName, password, userMail, phoneNumber } = req.body

    const data = req.body;
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

        const validEmail = !(/^([\da-z_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/.test(userMail))
        const validUserName = /^([\da-z_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/.test(userName)
        const validPhoneNumber = `${(parseInt(phoneNumber))}`.length

        if(validEmail) return res.status(500).send({'error': 'Correo no valido', 'menssage': 'El correo electronico proporcinado no cumple con las caracteristicas necesarias para ser valido.'});
        if(validUserName) return res.status(500).send({'error': 'Nombre no valido', 'menssage': 'El nombre de usuario proporcinado no cumple con las caracteristicas necesarias para ser valido.'});
        if(validPhoneNumber != 10) return res.status(500).send({'error': 'Numero de telefono no valido', 'menssage': 'El numero telefonico proporcinado no cumple con las caracteristicas necesarias para ser valido.'});

        const checkEmail = await pool.request().input('userMail', sql.VarChar, userMail).query(querys.checkEmail);
        const checkUserName = await pool.request().input('userName', sql.VarChar, userName).query(querys.checkUserName);
        const checkPhoneNumber = await pool.request().input('phoneNumber', sql.VarChar, phoneNumber).query(querys.checkPhoneNumber);

        if(checkEmail.rowsAffected[0] || checkUserName.rowsAffected[0] || checkPhoneNumber.rowsAffected[0]) return res.status(409).send({'error': 'Dato o usuario duplicado', 'menssage': 'El servidor ha encontrado un conflicto debido a un dato o usuario duplicado. Por favor, revise y corrija la solicitud.'});

        const hashedPassword = await bcrypt.hash(password, 10);

        await pool.request()
        .input('userId', sql.VarChar, uuidv4())
        .input('userName', sql.VarChar, userName)
        .input('password', sql.VarChar, hashedPassword)
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