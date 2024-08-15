import { Router } from "express";
import {
  getAllUsers,
  createUser,
  deleteUserById,
  findUserById,
  updateUserById,
} from "./user.controller.js";

const userRouter = Router();

userRouter.get("/", getAllUsers);
userRouter.post("/", createUser);
userRouter.delete("/:id", deleteUserById);
userRouter.get("/:id", findUserById);
userRouter.get("/:id", updateUserById);

export default userRouter;
