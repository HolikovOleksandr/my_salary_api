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
import authUserAccess from "../../middlewares/authUserAccess.js";
const userRouter = Router();

userRouter.get("/", getAllUsers);
userRouter.get("/:id", findUserById);

userRouter.post("/signin", signInUser);
userRouter.post("/singup", createUser);
userRouter.post("/", authUserAccess, adminAccess, createUser);

userRouter.patch("/:id", authUserAccess, ownerAndAdminAccess, updateUserById);

userRouter.delete("/", authUserAccess, adminAccess, deleteAllUsers);
userRouter.delete("/:id", authUserAccess, ownerAndAdminAccess, deleteUserById);

export default userRouter;
