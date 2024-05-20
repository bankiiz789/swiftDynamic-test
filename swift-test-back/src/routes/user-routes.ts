import express from "express";
import * as userController from "../controller/user-controller";

const router = express.Router();

router.post("/createUser", userController.createUser);
router.get("/users", userController.fetchUsers);
router.delete("/delete", userController.deleteUserController);
router.patch("/edit", userController.editUserController);

export default router;
