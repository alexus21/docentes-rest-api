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
        const result = await Users.verifyUser(req.query.email);

        if (!result) {
            return res.status(404).json({ error: "User not found!" });
        }
        const isPasswordValid = bcrypt.compareSync(req.query.password, result.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: "Invalid password!" });
        }
        return res.status(200).json({
            "message": "User verified successfully!",
            "user": result,
            "password": isPasswordValid
        });
    } catch (err) {
        return res.status(500).json({ error: err.message });
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
