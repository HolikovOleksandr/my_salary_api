import { Router } from "express";
import {
  getAllUsers,
  createUser,
  deleteUserById,
  findUserById,
  updateUserById,
  signInUser,
  deleteAllUsers,
} from "./user.controller.js";
import adminAccess from "../../middlewares/adminAccess.js";
import ownerAndAdminAccess from "../../middlewares/ownerAndAdminAccess.js";
import authenticateUser from "../../middlewares/authenticateUser.js";

const userRouter = Router();

userRouter.get("/", getAllUsers);
userRouter.get("/:id", findUserById);

userRouter.post("/", authenticateUser, adminAccess, createUser);
userRouter.post("/login", signInUser);

userRouter.patch("/:id", authenticateUser, ownerAndAdminAccess, updateUserById);

userRouter.delete("/", authenticateUser, adminAccess, deleteAllUsers);
userRouter.delete(
  "/:id",
  authenticateUser,
  ownerAndAdminAccess,
  deleteUserById
);

export default userRouter;
