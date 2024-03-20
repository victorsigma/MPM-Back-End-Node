import { getConnection, querys } from "../database";
import { promisify } from 'util';

export const getThemes = async (req, res) => {
    try {
        const pool = await getConnection();
        const queryAsync = promisify(pool.query).bind(pool);

        const themes = await queryAsync(querys.getThemes);
        return res.json(themes);
    }
    catch(error) {
        res.status(500).send({ 'message': error.message });
    }
}

export const getIcons = async (req, res) => {
    try {
        const pool = await getConnection();
        const queryAsync = promisify(pool.query).bind(pool);

        const icons = await queryAsync(querys.getIcons);
        return res.json(icons);
    }
    catch(error) {
        res.status(500).send({ 'message': error.message });
    }
}