import chalk from "chalk";

const adminAccess = (req, res, next) => {
  console.log(chalk.yellow.bold("::: [Middleware]"), "Admin Access");

  try {
    if (req.user && req.user.role === "admin") return next();
  } catch (error) {
    next(error);
  }
};

export default adminAccess;
