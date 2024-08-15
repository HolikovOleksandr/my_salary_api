import { Router } from "express";
import {
  getAllUsers,
  createUser,
  deleteUserById,
  findUserById,
  updateUserById,
  authenticateUser,
} from "./user.controller.js";

const userRouter = Router();

userRouter.get("/", getAllUsers);
userRouter.post("/", createUser);
userRouter.delete("/:id", deleteUserById);
userRouter.get("/:id", findUserById);
userRouter.patch("/:id", updateUserById);
userRouter.post("/login", authenticateUser);

export default userRouter;
