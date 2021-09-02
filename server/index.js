import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import memoryRouter from "./routers/memoryRouter.js";
import userRouter from "./routers/userRouter.js"

dotenv.config();

const app = express();

app.use(express.json({ limit: "2mb" }));
app.use(cors({credentials : true , origin : "http://localhost:3000"}));
app.use(cookieParser())

app.use("/memories", memoryRouter);
app.use("/users", userRouter);

app.listen(process.env.PORT, () => {
  console.log(`server running on port ${process.env.PORT}`);

  mongoose
    .connect(process.env.MONGODB_CONNECTION_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("connection successful"))
    .catch((err) => console.log(err));
});
