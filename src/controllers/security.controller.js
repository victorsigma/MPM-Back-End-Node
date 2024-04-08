import { getConnection, querys } from "../database";
import { promisify } from 'util';
import jwt from "jsonwebtoken";
import { transporter } from "../libs/mailer";


export const enableA2F = async (req, res) => {
    const tokenVerify = req.token;

    jwt.verify(tokenVerify, process.env.KEY, (error, authData) => {
        if (error) return res.json({ value: false });
    })
    const tokenInfo = jwt.decode(tokenVerify, { complete: true })

    const email = tokenInfo.payload.userMail;

    try {
        const connection = await getConnection();
        const queryAsync = promisify(connection.query).bind(connection);

        const result = await queryAsync(querys.checkEmail, [email]);

        if (result.length > 0) {
            // La dirección de correo electrónico existe en la base de datos
            const user = result[0];

            await queryAsync(querys.enableA2F, [user.userId])
            return res.json({ 'message': 'Successfully completed' });
        } else {
            // La dirección de correo electrónico no existe en la base de datos
            res.status(404).json({ 'message': 'Email address not found' });
        }
    } catch (error) {
        res.status(500).send({ 'message': error.message })
    }
}

export const disableA2F = async (req, res) => {
    const tokenVerify = req.token;

    jwt.verify(tokenVerify, process.env.KEY, (error, authData) => {
        if (error) return res.json({ value: false });
    })
    const tokenInfo = jwt.decode(tokenVerify, { complete: true })

    const email = tokenInfo.payload.userMail;

    try {
        const connection = await getConnection();
        const queryAsync = promisify(connection.query).bind(connection);

        const result = await queryAsync(querys.checkEmail, [email]);

        if (result.length > 0) {
            // La dirección de correo electrónico existe en la base de datos
            const user = result[0];

            await queryAsync(querys.disableA2F, [user.userId])
            return res.json({ 'message': 'Successfully completed' });
        } else {
            // La dirección de correo electrónico no existe en la base de datos
            res.status(404).json({ message: 'Email address not found' });
        }
    } catch (error) {
        res.status(500).send({ 'message': error.message })
    }
}

export const verifyAccount = async (req, res) => {
    const tokenVerify = req.token;

    jwt.verify(tokenVerify, process.env.KEY, (error, authData) => {
        if (error) return res.json({ value: false });
    })
    const tokenInfo = jwt.decode(tokenVerify, { complete: true })

    const email = tokenInfo.payload.userMail;

    try {
        const connection = await getConnection();
        const queryAsync = promisify(connection.query).bind(connection);

        const result = await queryAsync(querys.checkEmail, [email]);

        if (result.length > 0) {
            // La dirección de correo electrónico existe en la base de datos
            const user = result[0];

            if (!user.emailVerified) {
                return res.json({ emailAlreadyVerified: false });
            } else {
                // El correo electrónico ya está verificado
                return res.json({ emailAlreadyVerified: true });
            }
        } else {
            // La dirección de correo electrónico no existe en la base de datos
            res.status(404).json({ message: 'Email address not found' });
        }
    } catch (error) {
        res.status(500).send({ 'message': error.message })
    }
}


export const verifyA2F = async (req, res) => {
    const tokenVerify = req.token;

    jwt.verify(tokenVerify, process.env.KEY, (error, authData) => {
        if (error) return res.json({ value: false });
    })
    const tokenInfo = jwt.decode(tokenVerify, { complete: true })

    const email = tokenInfo.payload.userMail;

    try {
        const connection = await getConnection();
        const queryAsync = promisify(connection.query).bind(connection);

        const result = await queryAsync(querys.checkEmail, [email]);

        if (result.length > 0) {
            // La dirección de correo electrónico existe en la base de datos
            const user = result[0];

            if (!user.twoFactorAuthEnabled) {
                return res.json({ authTwoVerified: false });
            } else {
                // El correo electrónico ya está verificado
                return res.json({ authTwoVerified: true });
            }
        } else {
            // La dirección de correo electrónico no existe en la base de datos
            res.status(404).json({ message: 'Email address not found' });
        }
    } catch (error) {
        res.status(500).send({ 'message': error.message })
    }
}

export const verifyAccountRequest = async (req, res) => {
    const tokenVerify = req.token;

    jwt.verify(tokenVerify, process.env.KEY, (error, authData) => {
        if (error) return res.json({ value: false });
    })
    const tokenInfo = jwt.decode(tokenVerify, { complete: true })

    const email = tokenInfo.payload.userMail;

    try {
        const connection = await getConnection();
        const queryAsync = promisify(connection.query).bind(connection);

        const result = await queryAsync(querys.checkEmail, [email]);

        if (result.length > 0) {
            // La dirección de correo electrónico existe en la base de datos
            const user = result[0];

            if (!user.emailVerified) {
                jwt.sign({
                    userMail: user.userMail,
                    userIcon: user.userIcon

                }, process.env.KEY_V_EMAIL, { expiresIn: '3h' }, async (err, token) => {
                    const verificationEmailMessage = {
                        from: '"MPM" <mpm@example.com>', // Dirección del remitente
                        to: user.userMail, // Lista de destinatarios
                        subject: "Verificación de Cuenta", // Asunto del correo
                        text: "Verificación de cuenta", // Cuerpo del correo en texto plano
                        html: `
                            <div style="background-color: #1a1a1a; color: #ffffff; padding: 20px;">
                                <h2 style="color: #f1c0ff;">Verificación de Cuenta</h2>
                                <p>¡Hola!</p>
                                <p>Para verificar tu cuenta, haz clic en el siguiente enlace:</p>
                                <a href="https://my-project-manager-mpm.web.app/verify-account/${token}" style="background-color: #6347ee; color: #ffffff; padding: 10px 20px; text-decoration: none; border-radius: 5px; margin-top: 20px; display: inline-block;">Verificar Cuenta</a>
                                <p>Si el botón de arriba no funciona, puedes copiar y pegar el siguiente enlace en tu navegador:</p>
                                <p>https://my-project-manager-mpm.web.app/verify-account/${token}</p>
                                <p>Gracias,</p>
                                <p>El equipo de MPM</p>
                            </div>
                        ` // Cuerpo del correo en formato HTML
                    };

                    await transporter.sendMail(verificationEmailMessage);

                    return res.status(200).send({ 'message': 'Verification email sent' });
                })
            } else {
                // El correo electrónico ya está verificado
                return res.json({ emailAlreadyVerified: true });
            }
        } else {
            // La dirección de correo electrónico no existe en la base de datos
            res.status(404).json({ message: 'Email address not found' });
        }
    } catch (error) {
        res.status(500).send({ 'message': error.message })
    }
}


export const verifyAccountValidation = async (req, res) => {
    const { token } = req.params;

    jwt.verify(token, process.env.KEY_V_EMAIL, async (error, authData) => {
        if (error) {
            return res.status(401).send({ 'message': 'The verification is no longer valid, please resend the request.' });
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

                    if (!user.emailVerified) {
                        await queryAsync(querys.verifyEmail, [true, user.userId]);
                    }

                    // El correo electrónico ya está verificado
                    return res.json({ emailAlreadyVerified: true });
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