import { getConnection, querys } from "../database";
import {v4 as uuidv4} from 'uuid';
import bcrypt from "bcrypt";
import jwt  from "jsonwebtoken";
import { promisify } from 'util';

export const login = async (req, res) => {
    const { userNameOrEmail, password } = req.body
    const isRemember = req.query.remember == 'true' ? true : false;

    if( userNameOrEmail == null || password == null) return res.status(400).send({msg: 'Bad Request'});

    try {
        const pool = await getConnection();
        const queryAsync = promisify(pool.query).bind(pool);

        const validEmail = /^([\da-z_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/.test(userNameOrEmail)
        let checkUser;
        if(validEmail) {
            //checkUser = await pool.request().input('userMail', sql.VarChar, userNameOrEmail).query(querys.checkEmail);
            checkUser = await queryAsync(querys.checkEmail, [userNameOrEmail])
        } else {
            checkUser = await queryAsync(querys.checkUserName, [userNameOrEmail]);
        }

        const user = checkUser[0];

        if(checkUser != undefined) {
            bcrypt.compare(password, user.password).then((result) => {
                if(result) {
                    if(!isRemember) {
                        jwt.sign({
                            userName: user.userName,
                            userMail: user.userMail,
                            phoneNumber: user.phoneNumber,
                            userIcon: user.userIcon
    
                        }, '77767b40-fedc-11ec-b939-0242ac120002', { expiresIn: '24h' }, (err, token) => {
                            res.json({ token })
                        })
                    }
                    else {
                        jwt.sign({
                            userName: user.userName,
                            userMail: user.userMail,
                            phoneNumber: user.phoneNumber,
                            userIcon: user.userIcon
    
                        }, '77767b40-fedc-11ec-b939-0242ac120002', { expiresIn: '30d' }, (err, token) => {
                            res.json({ token })
                        })
                    }
                } else {
                    res.status(500).json({ msg: 'Incorrect data' })
                }
            })
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
}

export const verifyLogin = async (req, res) => {
    jwt.verify(req.token, "77767b40-fedc-11ec-b939-0242ac120002", (error, authData) => {
        if (error) return res.json({value: false});
        res.json({value: true})
    })
}


export const createNewUser = async (req, res) => {
    const { userId, userName, password, userMail, phoneNumber } = req.body;

    if (
        userId == null ||
        userName == null ||
        password == null ||
        userMail == null ||
        phoneNumber == null
    ) {
        return res.status(400).json({ msg: 'Bad Request' });
    }

    try {
        const connection = await getConnection(); // Reemplaza con la función adecuada para obtener la conexión a MySQL
        const queryAsync = promisify(connection.query).bind(connection);

        const validEmail = !/^([\da-z_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/.test(userMail);
        const validUserName = /^([\da-z_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/.test(userName);
        const validPhoneNumber = `${parseInt(phoneNumber)}`.length;

        if (validEmail) return res.status(500).json({ error: 'Correo no válido', message: 'El correo electrónico proporcionado no cumple con las características necesarias para ser válido.' });
        if (validUserName) return res.status(500).json({ error: 'Nombre no válido', message: 'El nombre de usuario proporcionado no cumple con las características necesarias para ser válido.' });
        if (validPhoneNumber !== 10) return res.status(500).json({ error: 'Número de teléfono no válido', message: 'El número telefónico proporcionado no cumple con las características necesarias para ser válido.' });

        const [checkEmail] = await queryAsync(querys.checkEmail, [userMail]);
        const [checkUserName] = await queryAsync(querys.checkUserName, [userName]);
        const [checkPhoneNumber] = await queryAsync(querys.checkPhoneNumber, [phoneNumber]);

        if (checkEmail != undefined || checkUserName != undefined || checkPhoneNumber != undefined) {
            return res.status(409).json({ error: 'Dato o usuario duplicado', message: 'El servidor ha encontrado un conflicto debido a un dato o usuario duplicado. Por favor, revise y corrija la solicitud.' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await queryAsync(querys.setUser, [uuidv4(), userName, hashedPassword, userMail, phoneNumber]);

        res.json(req.body);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

export const getUserById = async (req, res) => {
    const { id } = req.params;
    try {
        const connection = await getConnection(); // Reemplaza con la función adecuada para obtener la conexión a MySQL
        const queryAsync = promisify(connection.query).bind(connection);

        const result = await queryAsync(querys.getUserById, [id]);

        res.json(result[0]);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

export const deleteUserById = async (req, res) => {
    const { id } = req.params;
    try {
        const connection = await getConnection(); // Reemplaza con la función adecuada para obtener la conexión a MySQL
        const queryAsync = promisify(connection.query).bind(connection);

        await queryAsync(querys.deleteUser, [id]);

        res.sendStatus(204);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

export const updateUserById = async (req, res) => {
    const { id } = req.params;
    const { userId, userName, password, userMail, phoneNumber } = req.body;

    if (
        userId == null ||
        userName == null ||
        password == null ||
        userMail == null ||
        phoneNumber == null
    ) {
        return res.status(400).json({ msg: 'Bad Request' });
    }

    try {
        const connection = await getConnection(); // Reemplaza con la función adecuada para obtener la conexión a MySQL
        const queryAsync = promisify(connection.query).bind(connection);

        await queryAsync(querys.updateUser, [userName, password, userMail, phoneNumber, id]);

        const result = await queryAsync(querys.getUserById, [id]);

        res.json(result[0]);
    } catch (error) {
        res.status(500).send(error.message);
    }
};