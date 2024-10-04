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

export const verifyUser = async (req, res) => {
    const { email } = req.query;
    if (!email) {
        return res.status(400).json({ error: "Email is required" });
    }
    try {
        const result = await Users.verifyUser({ email });
        if (result) {
            return res.status(200).json(result);
        } else {
            return res.status(404).json({ error: "User not found" });
        }
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
