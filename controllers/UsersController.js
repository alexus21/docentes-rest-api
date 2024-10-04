import Users from "../models/UsersModel.js";
import bcrypt from "bcryptjs";

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
        res.json(user);
    } catch (err) {
        res.status(500).send(err);
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

        const isPasswordValid = bcrypt.compareSync(req.query.password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({
                "message": "Contraseña incorrecta",
                "success": false
            });
        }
        if (user.enabled) {
            return res.status(401).json({
                "message": "Este usuario ya ha sido activado",
                "success": false
            });
        }
        await Users.changeStatus(user.id);
        return res.status(200).json({
            "message": "User enabled",
            "success": true,
            "user": user
        });
    } catch (err) {
        return res.status(500).json({error: err.message});
    }
};

export const init = async (req, res) => {
    try {
        const init = await Users.init();
        res.json(init);
    } catch (err) {
        res.status(500).send(err);
    }
};
