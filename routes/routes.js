import Router from "express";
import {
    getAllUsers,
    getUserById,
    verifyUser,
    init,
    changeStatus,
    getUserByMail
} from "../controllers/UsersController.js";
import {apiKeyMiddleware} from "../middleware/apiKeyMiddleware.js";

const router = Router();

router.get("/users", apiKeyMiddleware, getAllUsers);
router.get("/users/:id", apiKeyMiddleware, getUserById);
router.get("/findByMail", apiKeyMiddleware, getUserByMail);
router.get("/verifyUser", apiKeyMiddleware, verifyUser);
router.put("/users/:id", apiKeyMiddleware, changeStatus);
router.get("/init", init);

export default router;
