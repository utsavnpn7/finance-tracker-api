import express, { Application, Request, Response } from "express";
import dotenv from "dotenv";

import cors from "cors";
import connectDB from "./services/dbConnection";
import AuthRoutes from "./routes/AuthRoute";
dotenv.config();
const app: Application = express();

//middleware
app.use(cors());
app.use(express.json());
//Routes
app.use("/auth", AuthRoutes);
//HealtCheck Route
app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Finance Tracker API is running!" });
});

//Start Server
const PORT = process.env.PORT;
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
