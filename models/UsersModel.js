import db from "../config/db.js";
import fs from "fs";
import {hashPassword} from "../moduls/password-cryptor.js";

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
    },
    initTable: async () => {
        return await db.query(
            `
                create table users
                (
                    id         serial not null
                        constraint users_pk primary key,
                    full_name  varchar(50),
                    email      varchar(50),
                    password   varchar(200),
                    activated  boolean   default false,
                    created_at timestamp default now(),
                    updated_at timestamp default now()
                );
            `
        );
    },
    initUsers: async () => {
        const users = fs.readFileSync("./users.json", "utf-8");
        const parsedUsers = JSON.parse(users).users;
        const results = [];

        for (const user of parsedUsers) {
            const hashedPassword = await hashPassword(user.password);
            const result = await db.query("INSERT INTO users (id, full_name, email, password) VALUES ($1, $2, $3, $4)",
                [user.id, user.full_name, user.email, hashedPassword]
            );
            results.push(result);
        }

        return results;
    }
};

export default Users;
