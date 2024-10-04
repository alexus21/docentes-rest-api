import Router from "express";
import {getAllUsers, getUserById, verifyUser, initUsers} from "../controllers/UsersController.js";

const router = Router();

router.get("/users", getAllUsers);
router.get("/users/:id", getUserById);
router.get("/users/verifyUser", verifyUser);
router.get("/init", initUsers);

export default router;
