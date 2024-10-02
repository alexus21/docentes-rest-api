import Users from "../models/UsersModel.js";

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
