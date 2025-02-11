import "dotenv/config";

import express from "express";
import cors from "cors";
import connectDB from "./db/connect.js";
import sectionRoutes from "./routes/sectionRoutes.js";
import { createDefaultSections } from "./controllers/sectionControllers.js";

const app = express();

//middlewares
app.use(express.json());
app.use(
  cors({
    origin: [process.env.CLIENT_URL],
  })
);

//routes
app.use("/section", sectionRoutes);

app.get("/", (req, res) => {
  res.status(200).json({ message: "working" });
});

const port = process.env.PORT || 3000;

const init = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    await createDefaultSections();
    app.listen(port, () => {
      console.log(`server running at port : ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

init();
