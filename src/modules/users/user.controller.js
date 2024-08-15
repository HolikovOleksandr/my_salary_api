import User from "./user.schema.js";
import { generateToken } from "../auth/auth.service.js";

export const getAllUsers = async (req, res, next) => {
  try {
    const data = await User.find().select("-password");
    res.status(200).json({ succsses: true, data });
  } catch (error) {
    next(error);
  }
};

export const createUser = async (req, res, next) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();

    res.status(201).json({ succsses: true, data: newUser });
  } catch (error) {
    next(error);
  }
};

export const deleteUserById = async (req, res, next) => {
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

export const authenticateUser = async (req, res, next) => {
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
