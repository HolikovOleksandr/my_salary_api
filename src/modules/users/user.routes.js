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
import authUser from "../../middlewares/authenticateUser.js";

const userRouter = Router();

userRouter.get("/", getAllUsers);
userRouter.get("/:id", findUserById);

userRouter.post("/signin", signInUser);
userRouter.post("/singup", createUser);
userRouter.post("/", authUser, adminAccess, createUser);

userRouter.patch("/:id", authUser, ownerAndAdminAccess, updateUserById);

userRouter.delete("/", authUser, adminAccess, deleteAllUsers);
userRouter.delete("/:id", authUser, ownerAndAdminAccess, deleteUserById);

export default userRouter;
