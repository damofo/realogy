import mongoose from "mongoose";
import { CONFIG } from "../constants/database";

/**
 * Returns a Promise that’s fulfilled once the database is connected. The
 * Promise is cached globally to avoid unnecessary connections when possible.
 */
export async function connect() {
  console.log("hererereres");
  const { readyState } = mongoose.connection;
  console.log("MongoDB connection state: %s", mongoose.connection.readyState);

  if (readyState === 1) {
    console.log("🍃 Using existing MongoDB connection.");
    return;
  }

  try {
    await mongoose.connect(
      process.env.MONGO_CONNECTION_STRING ||
        "mongodb://127.0.0.1:27017/realogy?w=majority&readPreference=primary&retryWrites=true&ssl=false&directConnection=true",
      CONFIG
    );
    console.log("🍃 Connected to MongoDB");
  } catch (e) {
    console.log(e);
  }
}

mongoose.set("debug", (collectionName, method, query, doc) => {
  console.log(`${collectionName}.${method}(%o, %o)`, query, doc);
});

//Bind connection to error event (to get notification of connection errors)
mongoose.connection.on("error", (e) => {
  console.log("🍂 MongoDB Error");
  console.log(e);
});

mongoose.connection.on("close", () => {
  console.log("🍂 MongoDB connection closed.");
});

mongoose.connection.on("disconnect", () => {
  console.log("🍂 MongoDB connection disconnected.");
});
