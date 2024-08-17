import { Router } from "express";
import {
  createCashflow,
  deleteAllCashflows,
  deleteOneCashflowById,
  getAllCashflows,
  getOneCashflowById,
  updateCashflowById,
} from "./cashflow.controller.js";
import authUserAccess from "../../middlewares/authUserAccess.js";
import ownerAndAdminAccess from "../../middlewares/ownerAndAdminAccess.js";
import adminAccess from "../../middlewares/adminAccess.js";
const cashflowRouter = Router();

cashflowRouter.post("/", authUserAccess, ownerAndAdminAccess, createCashflow);

cashflowRouter.get("/", authUserAccess, getAllCashflows);
cashflowRouter.get("/:id", authUserAccess, getOneCashflowById);

cashflowRouter.patch("/:id", authUserAccess, updateCashflowById);

cashflowRouter.delete("/", authUserAccess, adminAccess, deleteAllCashflows);
cashflowRouter.delete(
  "/:id",
  authUserAccess,
  ownerAndAdminAccess,
  deleteOneCashflowById
);

export default cashflowRouter;
