import "dotenv/config";

import express from "express";
import connectDB from "./db/connect.js";

const app = express();

app.get("/", (req, res) => {
  res.status(200).json({ message: "working" });
});

const port = process.env.PORT || 3000;

const init = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`server running at port : ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

init();
