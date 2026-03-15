import express, { Application, Request, Response } from "express";
import dotenv from "dotenv";
import errorMiddleware from "./middleware/errorMiddleware";
import cors from "cors";
import connectDB from "./services/dbConnection";
import AuthRoutes from "./routes/AuthRoute";
import TransactionRoutes from "./routes/TransactionRoute";
import cookieParser from "cookie-parser";
dotenv.config();
const app: Application = express();

//middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser());
//Routes
app.use("/api/transaction", TransactionRoutes);
app.use("/api/auth", AuthRoutes);
//HealtCheck Route
app.get("/health", (req: Request, res: Response) => {
  res.json({ message: "Finance Tracker API is running!" });
});

//Error middleware handler
app.use(errorMiddleware);
//Start Server
const PORT = process.env.PORT;
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
