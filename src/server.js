import express from "express";
import errorHandler from "./middlewares/errorHandler.js";
import logger from "./middlewares/logger.js";
import databaseConnection from "./database/connection.js";
import userRouter from "./modules/users/user.routes.js          ";

const server = async (connectionString, port = 3000) => {
  const app = express();

  app.use(logger);
  app.use(express.json());
  app.all("api");
  app.use("/users", userRouter);

  app.use(errorHandler);

  await databaseConnection(connectionString, () =>
    app.listen(port, () => console.log("🦾 Server was runned on", port))
  );
};

export default server;
