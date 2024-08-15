import User from "./user.schema.js";

export const getAllUsers = async (req, res, next) => {
  try {
    const data = await User.find();
    res.status(200).json({ succsses: true, data });
  } catch (error) {
    next(error);
  }
};

export const createUser = async (req, res, next) => {
  const { name, email } = req.body;

  try {
    const newUser = new User({ name, email });
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
    const user = await User.findById(id);

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
