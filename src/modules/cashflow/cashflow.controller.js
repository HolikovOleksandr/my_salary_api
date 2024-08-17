import { verifyToken } from "../auth/jwt.service.js";
import Cashflow from "./cashflow.chema.js";
import chalk from "chalk";

export const createCashflow = async (req, res, next) => {
  console.log(chalk.green.bold("==> [Method]"), "Create Cashflow");

  const { date, revenue, total, cash, money, expenses, notes } = req.body;
  const payload = verifyToken(req.headers.authorization);
  const user = payload.id;

  try {
    const newCashflow = new Cashflow({
      date,
      user,
      revenue,
      total,
      cash,
      money,
      expenses,
      notes,
    });

    await newCashflow.save();
    res.status(201).json({ success: true, data: newCashflow });
  } catch (error) {
    next(error);
  }
};

export const getAllCashflows = async (req, res, next) => {
  console.log(chalk.green.bold("==> [Method]"), "Get All Cashflows");

  try {
    const cashflows = await Cashflow.find().populate("user", "-password");
    res.status(200).json({ succsses: true, data: cashflows });
  } catch (error) {
    next(error);
  }
};

export const getOneCashflowById = async (req, res, next) => {
  console.log(chalk.green.bold("==> [Method]"), "Get One Cashflow By Id");

  const { id } = req.params;
  try {
    const cashflow = await Cashflow.findById(id).populate("user", "-password");

    if (!cashflow) {
      return res
        .status(404)
        .json({ success: false, message: "Cashflow not found" });
    }

    res.status(200).json({ success: true, data: cashflow });
  } catch (error) {
    next(error);
  }
};

export const updateCashflowById = async (req, res, next) => {
  console.log(chalk.green.bold("==> [Method]"), "Update User By Id");

  const { id } = req.params;

  try {
    const updatedCashflow = await Cashflow.findByIdAndUpdate(
      id,
      { ...req.body },
      { new: true, runValidators: true }
    );

    if (!updatedCashflow) {
      return res
        .status(404)
        .json({ success: false, message: "Cashflow not found" });
    }

    res.status(200).json({ success: true, data: updatedCashflow });
  } catch (error) {
    next(error);
  }
};

export const deleteOneCashflowById = async (req, res, next) => {
  console.log(chalk.green.bold("==> [Method]"), "Delete Cahsflow By Id");

  const { id } = req.params;

  try {
    const cashflow = await Cashflow.findByIdAndDelete(id);

    if (!cashflow) {
      return res
        .status(404)
        .json({ success: false, message: "Cashflow does'nt exist" });
    }

    res.status(200).json({
      success: true,
      data: cashflow,
      message: "Cashflow deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const deleteAllCashflows = async (req, res, next) => {
  console.log(chalk.green.bold("==> [Method]"), "Delete All Cashflows");

  try {
    const cashflow = await Cashflow.deleteMany();

    res
      .status(200)
      .json({ success: true, deletedCount: cashflow.deletedCount });
  } catch (error) {
    next(error);
  }
};
