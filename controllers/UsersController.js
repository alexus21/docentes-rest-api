import Users from "../models/UsersModel.js";
import bcrypt from "bcryptjs";
import fs from "fs";

export const getAllUsers = async (req, res) => {
    try {
        const users = await Users.getAll();
        res.json(users);
    } catch (err) {
        res.status(500).send(err);
    }
};

export const getUserById = async (req, res) => {
    try {
        const user = await Users.getById(req.params.id);
        res.json({
            success: true,
            data: user
        });
    } catch (err) {
        res.status(500).send(err);
    }
};

export const getUserByMail = async (req, res) => {
    try {
        const email = req.query.email; // Asegurarse de que es email lo que se consulta
        const user = await Users.getByEmail(email);

        if (!user) {
            return res.status(404).json({ error: "Usuario no encontrado" });
        }

        const users = fs.readFileSync('./users.json', 'utf-8');
        const parsedUsers = JSON.parse(users).users;
        const userPassword = parsedUsers.find(user => user.email === email).password;

        res.json({
            success: true,
            email: email,
            password: userPassword
        });
    } catch (err) {
        console.error('Error al obtener usuario por email:', err.message);
        res.status(500).json({ error: 'Error interno del servidor', details: err.message });
    }
};

export const verifyUser = async (req, res) => {
    try {

        if (!req.query.email){
            return res.status(400).json({error: "Por favor, ingrese el correo electrónico"});
        }

        if (!req.query.password){
            return res.status(400).json({error: "Por favor, ingrese la contraseña"});
        }

        const user = await Users.verifyUser(req.query.email);

        if (!user) {
            return res.status(404).json({error: "Usuario no encontrado"});
        }

        if (user.enabled) {
            return res.status(401).json({
                "message": "Este usuario ya ha sido activado",
                "success": false,
                "enabled": true
            });
        }

        const isPasswordValid = bcrypt.compareSync(req.query.password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({
                "message": "Contraseña incorrecta",
                "success": false
            });
        }
        return res.status(200).json({
            "message": "User enabled",
            "success": true,
            "user": await Users.getById(user.id)
        });
    } catch (err) {
        return res.status(500).json({error: err.message});
    }
};

export const changeStatus = async (req, res) => {
    try {
        const user = await Users.changeStatus(req.params.id);
        res.json({
            success: true,
            data: user,
            message: "Contraseña actualizada correctamente"
        });
    } catch (err) {
        res.status
    }
}

export const init = async (req, res) => {
    try {
        const init = await Users.init();
        res.json(init);
    } catch (err) {
        res.status(500).send(err);
    }
};
