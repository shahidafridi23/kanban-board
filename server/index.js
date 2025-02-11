import "dotenv/config";

import express from "express";
import connectDB from "./db/connect.js";
import sectionRoutes from "./routes/sectionRoutes.js";

const app = express();

//middlewares
app.use(express.json());

//routes
app.use("/section", sectionRoutes);

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
