import Router from "express";
import {getAllUsers, getUserById, verifyUser, init, changeStatus} from "../controllers/UsersController.js";

const router = Router();

router.get("/users", getAllUsers);
router.get("/users/:id", getUserById);
router.get("/verifyUser", verifyUser);
router.put("/users/:id", changeStatus);
router.get("/init", init);

export default router;
