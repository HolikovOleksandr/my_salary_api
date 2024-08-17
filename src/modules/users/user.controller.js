import User from "./user.schema.js";
import { generateToken } from "../auth/jwt.service.js";

export const getAllUsers = async (req, res, next) => {
  console.log(chalk.green.bold("==> [Method]"), "Find All Users");

  try {
    const users = await User.find().select("-password");
    res.status(200).json({ succsses: true, data: users });
  } catch (error) {
    next(error);
  }
};

export const createUser = async (req, res, next) => {
  console.log(chalk.green.bold("==> [Method]"), "User Create");

  try {
    const newUser = new User(req.body);
    await newUser.save();

    const data = newUser.toObject();
    delete data.password;

    res.status(201).json({ succsses: true, data });
  } catch (error) {
    next(error);
  }
};

export const deleteAllUsers = async (req, res, next) => {
  console.log(chalk.green.bold("==> [Method]"), "Delete All Users");

  try {
    const users = await User.deleteMany({ role: "user" });
    res.status(200).json({ success: true, deletedCount: users.deletedCount });
  } catch (error) {
    next(error);
  }
};

export const deleteUserById = async (req, res, next) => {
  console.log(chalk.green.bold("==> [Method]"), "Delete User By Id");

  const { id } = req.params;

  try {
    const user = await User.findByIdAndDelete(id);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User does'nt exist" });
    }

    res.status(200).json({
      success: true,
      data: user,
      message: "User deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const findUserById = async (req, res, next) => {
  console.log("==> [Method] Find User By Id");
  console.log(chalk.green.bold("==> [Method]"), "Update User By Id");

  const { id } = req.params;

  try {
    const user = await User.findById(id).select("-password");

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res.status(200).json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
};

export const updateUserById = async (req, res, next) => {
  console.log(chalk.green.bold("==> [Method]"), "Update User By Id");

  const { id } = req.params;
  const { name, email } = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { name, email },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res.status(200).json({ success: true, data: updatedUser });
  } catch (error) {
    next(error);
  }
};

export const signInUser = async (req, res, next) => {
  console.log(chalk.green.bold("==> [Method]"), "Sign In User");

  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const isMatch = await user.validatePassword(password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid password" });
    }

    const token = generateToken(user);
    return res.status(200).json({ success: true, token });
  } catch (error) {
    console.error("Error during authentication:", error);
    next(error);
  }
};
