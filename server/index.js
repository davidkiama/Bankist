import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import mongoose from "mongoose";

const app = express();
dotenv.config();

// middlewares
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(cors());

// test if server is running and send a response
app.get("/", (req, res) => {
  res.send("Server is running");
});

// connect to DB

const CONNECTION_URL = process.env.CONNECTION_URL;
const PORT = process.env.PORT || 5000;

mongoose
  .connect(CONNECTION_URL)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => console.error(error));
