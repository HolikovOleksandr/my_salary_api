import mongoose from "mongoose";

const databaseConnection = async (connectionString, callback) => {
  try {
    await mongoose.connect(connectionString);
    console.log("🧩 MongoDB connected");
    if (callback) await callback();
  } catch (error) {
    console.error("🛢️ Error connecting to MongoDB:", error);
    process.exit(1);
  }
};

export default databaseConnection;
