import mysql from 'mysql';

const dbSettings = {
    user: 'sigma',
    password: 'linux123',
    host: 'localhost',
    database: 'mpmdb'
}

export async function getConnection() {
    try {
        const pool = mysql.createConnection(dbSettings);
        return pool;
    } catch (error) {
        console.error(error);
    }
}

export { mysql };