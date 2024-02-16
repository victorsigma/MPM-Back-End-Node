import mysql from 'mysql';
import process from "process";

const dbSettings = {
    user: process.env.USER,
    password: process.env.PASSWORD,
    host: process.env.HOST,
    database: 'mpmdb',
    ssl: {
        rejectUnauthorized: true
    }
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