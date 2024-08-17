import jwt from "jsonwebtoken";
import User from "../modules/users/user.schema.js";
import chalk from "chalk";

const authUserAccess = async (req, res, next) => {
  console.log(chalk.yellow.bold("::: [Middleware]"), "User Authenticate");

  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id);
    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

export default authUserAccess;
