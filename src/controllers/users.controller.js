import { getConnection, querys } from "../database";
import { v4 as uuidv4 } from 'uuid';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { promisify } from 'util';
import { transporter } from "../libs/mailer";

export const login = async (req, res) => {
    const { userNameOrEmail, password } = req.body
    const isRemember = req.query.remember == 'true' ? true : false;

    if (userNameOrEmail == null || password == null) return res.status(400).send({ 'message': 'Bad Request' });

    try {
        const pool = await getConnection();
        const queryAsync = promisify(pool.query).bind(pool);

        const validEmail = /^([\da-z_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/.test(userNameOrEmail)
        let checkUser;
        if (validEmail) {
            //checkUser = await pool.request().input('userMail', sql.VarChar, userNameOrEmail).query(querys.checkEmail);
            checkUser = await queryAsync(querys.checkEmail, [userNameOrEmail])
        } else {
            checkUser = await queryAsync(querys.checkUserName, [userNameOrEmail]);
        }

        const user = checkUser[0];


        if (checkUser != undefined) {
            const selectedTheme = await queryAsync(querys.getTheme, [user.selectedTheme])
            bcrypt.compare(password, user.password).then((result) => {
                if (result) {

                    if (!isRemember) {
                        jwt.sign({
                            userName: user.userName,
                            userMail: user.userMail,
                            phoneNumber: user.phoneNumber,
                            userIcon: user.userIcon,
                            selectedTheme: selectedTheme[0].themeType

                        }, process.env.KEY, { expiresIn: '24h' }, (err, token) => {
                            res.json({ token })
                        })
                    }
                    else {
                        jwt.sign({
                            userName: user.userName,
                            userMail: user.userMail,
                            phoneNumber: user.phoneNumber,
                            userIcon: user.userIcon,
                            selectedTheme: selectedTheme[0].themeType

                        }, process.env.KEY, { expiresIn: '30d' }, (err, token) => {
                            res.json({ token })
                        })
                    }
                } else {
                    res.status(500).json({ 'message': 'Incorrect data' })
                }
            })
        }
    } catch (error) {
        console.log(error)
        res.status(500).send(error.message);
    }
}

export const changeTheme = async (req, res) => {
    const { token, theme } = req.body

    jwt.verify(token, "77767b40-fedc-11ec-b939-0242ac120002", (error, authData) => {
        if (error) return res.json({ value: false });
    })
    const tokenInfo = jwt.decode(token, { complete: true })
    try {

        const pool = await getConnection();
        const queryAsync = promisify(pool.query).bind(pool);
        const checkUser = await queryAsync(querys.checkUserName, [tokenInfo.payload.userName]);

        const user = checkUser[0];

        await queryAsync(querys.updateUserTheme, [theme.Id, user.userId])

        const checkNewUser = await queryAsync(querys.checkUserName, [tokenInfo.payload.userName]);

        const newUser = checkNewUser[0];
        const selectedTheme = await queryAsync(querys.getTheme, [newUser.selectedTheme])

        if (checkNewUser != undefined) {
            jwt.sign({
                userName: newUser.userName,
                userMail: newUser.userMail,
                phoneNumber: newUser.phoneNumber,
                userIcon: newUser.userIcon,
                selectedTheme: selectedTheme[0].themeType

            }, process.env.KEY, { expiresIn: '24h' }, (err, token) => {
                return res.json({ token })
            })
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
}

export const changeIcon = async (req, res) => {
    const { token, icon } = req.body

    jwt.verify(token, "77767b40-fedc-11ec-b939-0242ac120002", (error, authData) => {
        if (error) return res.json({ value: false });
    })
    const tokenInfo = jwt.decode(token, { complete: true })
    try {

        const pool = await getConnection();
        const queryAsync = promisify(pool.query).bind(pool);
        const checkUser = await queryAsync(querys.checkUserName, [tokenInfo.payload.userName]);

        const user = checkUser[0];

        await queryAsync(querys.updateUserIcon, [icon.id, user.userId])

        const checkNewUser = await queryAsync(querys.checkUserName, [tokenInfo.payload.userName]);

        const newUser = checkNewUser[0];
        const selectedTheme = await queryAsync(querys.getTheme, [newUser.selectedTheme])

        if (checkNewUser != undefined) {
            jwt.sign({
                userName: newUser.userName,
                userMail: newUser.userMail,
                phoneNumber: newUser.phoneNumber,
                userIcon: newUser.userIcon,
                selectedTheme: selectedTheme[0].themeType

            }, process.env.KEY, { expiresIn: '24h' }, (err, token) => {
                return res.json({ token })
            })
        }
    } catch (error) {
        console.log(error)
        res.status(500).send(error.message);
    }
}

export const updateUser = async (req, res) => {
    const { token, update } = req.body

    jwt.verify(token, process.env.KEY, (error, authData) => {
        if (error) return res.json({ value: false });
    })
    const tokenInfo = jwt.decode(token, { complete: true })

    try {
        const pool = await getConnection();
        const queryAsync = promisify(pool.query).bind(pool);
        const checkUser = await queryAsync(querys.checkUserName, [tokenInfo.payload.userName]);


        const [checkEmail] = await queryAsync(querys.checkEmail, [update.userMail]);
        const [checkUserName] = await queryAsync(querys.checkUserName, [update.userName]);
        const [checkPhoneNumber] = await queryAsync(querys.checkPhoneNumber, [update.phoneNumber]);

        if (checkEmail != undefined || checkUserName != undefined || checkPhoneNumber != undefined) {
            return res.status(409).json({ error: 'Dato o usuario duplicado', 'message': 'El servidor ha encontrado un conflicto debido a un dato o usuario duplicado. Por favor, revise y corrija la solicitud.' });
        }


        if(checkUser.length) {
            const user = checkUser[0];

            user.userName = update.userName !== undefined ? update.userName : user.userName;

            user.userMail = update.userMail !== undefined ? update.userMail : user.userMail;

            user.emailVerified = update.userMail !== undefined ? false : user.emailVerified;

            user.phoneNumber = update.phoneNumber !== undefined ? update.phoneNumber : user.phoneNumber;

            const hashedPassword = update.password !== undefined ? await bcrypt.hash(update.password, 10) : user.password;

            user.password = hashedPassword;

            await queryAsync(querys.updateUser, [user.userName, user.password, user.userMail, user.phoneNumber, user.emailVerified, user.userId]);

            const checkNewUser = await queryAsync(querys.getUserById, [user.userId]);
    
            const newUser = checkNewUser[0];
            const selectedTheme = await queryAsync(querys.getTheme, [newUser.selectedTheme])

            if (checkNewUser != undefined) {
                jwt.sign({
                    userName: newUser.userName,
                    userMail: newUser.userMail,
                    phoneNumber: newUser.phoneNumber,
                    userIcon: newUser.userIcon,
                    selectedTheme: selectedTheme[0].themeType

                }, process.env.KEY, { expiresIn: '24h' }, (err, token) => {
                    return res.json({ token })
                })
            }
        } else {
            return res.status(404).json({ 'message': 'Bad Request' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({ 'message': error.message });
    }
};


export const verifyLogin = async (req, res) => {
    jwt.verify(req.body.token, "77767b40-fedc-11ec-b939-0242ac120002", (error, authData) => {
        if (error) return res.json({ value: false });
        res.json({ value: true })
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
        return res.status(400).json({ 'message': 'Bad Request' });
    }

    try {
        const connection = await getConnection(); // Reemplaza con la función adecuada para obtener la conexión a MySQL
        const queryAsync = promisify(connection.query).bind(connection);

        const validEmail = !/^([\da-z_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/.test(userMail);
        const validUserName = /^([\da-z_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/.test(userName);
        const validPhoneNumber = `${parseInt(phoneNumber)}`.length;

        if (validEmail) return res.status(500).json({ error: 'Correo no válido', 'message': 'El correo electrónico proporcionado no cumple con las características necesarias para ser válido.' });
        if (validUserName) return res.status(500).json({ error: 'Nombre no válido', 'message': 'El nombre de usuario proporcionado no cumple con las características necesarias para ser válido.' });
        if (validPhoneNumber !== 10) return res.status(500).json({ error: 'Número de teléfono no válido', 'message': 'El número telefónico proporcionado no cumple con las características necesarias para ser válido.' });

        const [checkEmail] = await queryAsync(querys.checkEmail, [userMail]);
        const [checkUserName] = await queryAsync(querys.checkUserName, [userName]);
        const [checkPhoneNumber] = await queryAsync(querys.checkPhoneNumber, [phoneNumber]);

        if (checkEmail != undefined || checkUserName != undefined || checkPhoneNumber != undefined) {
            return res.status(409).json({ error: 'Dato o usuario duplicado', 'message': 'El servidor ha encontrado un conflicto debido a un dato o usuario duplicado. Por favor, revise y corrija la solicitud.' });
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


export const passwordRecoveryRequest = async (req, res) => {
    const { userNameOrEmail } = req.body

    if (
        userNameOrEmail == null || userNameOrEmail == undefined
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
            const user = checkUser[0];

            if (user.emailVerified) {
                jwt.sign({
                    userMail: user.userMail,
                    userIcon: user.userIcon

                }, process.env.KEY_R_PASSWORD, { expiresIn: '3h' }, async (err, token) => {
                    //Cogigo temporar para remplazar por envio de correo
                    const recoveryEmailMessage = {
                        from: '"MPM" <mpm@example.com>', // Dirección del remitente
                        to: user.userMail, // Lista de destinatarios
                        subject: "Recuperación de Contraseña", // Asunto del correo
                        text: "Solicitud de recuperación de contraseña", // Cuerpo del correo en texto plano
                        html: `
                            <div style="background-color: #1a1a1a; color: #ffffff; padding: 20px;">
                                <h2 style="color: #f1c0ff;">Recuperación de Contraseña</h2>
                                <p>¡Hola!</p>
                                <p>Recibimos una solicitud para recuperar la contraseña de tu cuenta.</p>
                                <p>Si no realizaste esta solicitud, puedes ignorar este mensaje.</p>
                                <p>Para restablecer tu contraseña, haz clic en el siguiente enlace:</p>
                                <a href="https://my-project-manager-mpm.web.app/password-recovery/reset/${token}" style="background-color: #6347ee; color: #ffffff; padding: 10px 20px; text-decoration: none; border-radius: 5px; margin-top: 20px; display: inline-block;">Restablecer Contraseña</a>
                                <p>Si el botón de arriba no funciona, puedes copiar y pegar el siguiente enlace en tu navegador:</p>
                                <p>https://my-project-manager-mpm.web.app/password-recovery/reset/${token}</p>
                                <p>Gracias,</p>
                                <p>El equipo de MPM</p>
                            </div>
                        ` // Cuerpo del correo en formato HTML
                    };

                    await transporter.sendMail(recoveryEmailMessage);
                    
                    return res.status(200).send({ 'message': 'Recovery email sent' })
                })
            } else {
                // El correo electrónico no está verificado
                return res.json({ emailAlreadyVerified: false });
            }
        } else {
            return res.status(404).send({ 'message': 'Not Found' })
        }
    } catch (error) {
        res.status(500).send({ 'message': error.message })
    }
}

export const passwordRecoveryReset = async (req, res) => {
    const { password } = req.body;
    const { token } = req.params;

    jwt.verify(token, process.env.KEY_R_PASSWORD, async (error, authData) => {
        if (error) {
            return res.status(401).send({ 'message': 'The request is no longer valid, please resubmit the request.' });
        } else {
            const tokenInfo = jwt.decode(token, { complete: true })

            const email = tokenInfo.payload.userMail;

            try {
                const connection = await getConnection();
                const queryAsync = promisify(connection.query).bind(connection);

                const result = await queryAsync(querys.checkEmail, [email]);

                if (result.length > 0) {
                    // La dirección de correo electrónico existe en la base de datos
                    const user = result[0];

                    const hashedPassword = await bcrypt.hash(password, 10);

                    await queryAsync(querys.recoveryPassword, [hashedPassword, user.userId])

                    // La contraseña a sido cambiada correctamente
                    return res.json({ 'message': 'Password has been successfully changed' });
                } else {
                    // La dirección de correo electrónico no existe en la base de datos
                    res.status(404).json({ 'message': 'Email address not found' });
                }
            } catch (error) {
                res.status(500).send({ 'message': 'Internal server error' })
            }
        }
    })
}