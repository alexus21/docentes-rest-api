import bcrypt from "bcryptjs";

export const checkPassword = async (password, hashedPassword) => {
    return bcrypt.compare(password, hashedPassword);
};
