import Router from "express";
import {getAllUsers, getUserById, verifyUser, initUsers, initTable} from "../controllers/UsersController.js";

const router = Router();

router.get("/users", getAllUsers);
router.get("/users/:id", getUserById);
router.get("/users/verifyUser", verifyUser);
router.get("/init", initTable);
router.get("/create-users", initUsers);

export default router;
