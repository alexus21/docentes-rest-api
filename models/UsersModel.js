import db from "../config/db.js";

const Users = {
    getAll: async () => {
        const result = await db.query("SELECT * FROM users");
        return result.rows;
    },
    getById: async id => {
        const result = await db.query("SELECT * FROM users WHERE id = $1", [id]);
        return result.rows[0];
    },
};

export default Users;
