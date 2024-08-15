import chalk from "chalk";

function logger(req, res, next) {
  const now = new Date().toISOString();
  const methodColor = req.method === "GET" ? chalk.green : chalk.blue;

  console.log(`[${now}] ${methodColor(req.method)} ${chalk.cyan(req.url)}`);
  next();
}

export default logger;
