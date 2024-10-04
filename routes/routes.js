import Router from "express";
import {getAllUsers, getUserById, verifyUser, init} from "../controllers/UsersController.js";

const router = Router();

router.get("/users", getAllUsers);
router.get("/users/:id", getUserById);
router.get("/verifyUser", verifyUser);
router.get("/init", init);

export default router;
