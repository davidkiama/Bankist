import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import mongoose from "mongoose";

import authRoutes from "./routes/auth.js";
import transactionRoutes from "./routes/transactions.js";

const app = express();
dotenv.config();

// middlewares
app.use(cors());
app.use(bodyParser.json({ limit: "30mb", extended: true }));

app.use("/auth", authRoutes);
app.use("/transaction", transactionRoutes);

// connect to DB

const CONNECTION_URL = process.env.CONNECTION_URL;
const PORT = process.env.PORT || 5000;

const connect = async () => {
  try {
    await mongoose.connect(CONNECTION_URL);
  } catch (error) {
    throw error;
  }
};

mongoose.connection.on("disconnected", () => {
  console.log("mongoDB disconnected");
});

mongoose.connection.on("connected", () => {
  console.log("mongoDB connected");
});

app.get("/", (req, res) => {
  res.send("APP IS RUNNING");
});

app.listen(PORT, () => {
  connect();
  console.log(`Server is running on port ${PORT}`);
});
