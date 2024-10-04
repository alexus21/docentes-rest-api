import db from "../config/db.js";

const Users = {
    getAll: async () => {
        const result = await db.query("SELECT id, full_name, email FROM users");
        return result.rows;
    },
    getById: async id => {
        const intId = parseInt(id, 10);
        if (isNaN(intId)) {
            throw new Error("Invalid ID format");
        }
        const result = await db.query("SELECT full_name, email FROM users WHERE id = $1", [intId]);
        return result.rows[0];
    },
    verifyUser: async (email) => {
        const result = await db.query("SELECT full_name, email, password FROM users WHERE email = ?",
            [email]
        );
        return result.rows[0];
    }
};

export default Users;
