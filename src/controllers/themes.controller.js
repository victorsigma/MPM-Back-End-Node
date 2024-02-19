import { getConnection, querys } from "../database";
import jwt  from "jsonwebtoken";

export const getThemes = async (req, res) => {
    try {
        const pool = await getConnection();
        const queryAsync = promisify(pool.query).bind(pool);

        const themes = queryAsync(querys.getThemes);

        return res.json(themes);
    }
    catch(error) {
        res.status(500).send(error.message);
    }
}