import chalk from "chalk";

const errorHandler = (err, req, res, next) => {
  console.log(chalk.red.bold("::: [Eror Handler]"));

  const errStatus = err.statusCode || 500;
  const errMsg = err.message || "Something went wrong";

  if (res.headersSent) return next(err);

  res.status(errStatus).json({
    success: false,
    status: errStatus,
    message: errMsg,
  });
};

export default errorHandler;
