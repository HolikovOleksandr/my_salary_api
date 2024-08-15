import dotenv from "dotenv";
import server from "./server.js";
dotenv.configDotenv();

const app = async () => {
  const port = process.env.PORT;
  const connectionString = process.env.MONGODB_CONNECTION_STRING;

  await server(connectionString, port);
};

app();
