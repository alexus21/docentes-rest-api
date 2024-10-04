import Router from "express";
import {getAllUsers, getUserById, verifyUser, initData, initTables} from "../controllers/UsersController.js";

const router = Router();

router.get("/users", getAllUsers);
router.get("/users/:id", getUserById);
router.get("/users/verifyUser", verifyUser);
router.get("/initTables", initTables);
router.get("/initData", initData);

export default router;
