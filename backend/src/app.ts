import express from "express";
import { AppDataSource } from "./config/typeOrmConfig";
import userRouter from "./routes/userRoutes";
import authRouter from "./routes/authRoutes";
import friendRouter from "./routes/friendRoutes";
import cors from "cors";

AppDataSource.initialize()
  .then(() => {
    console.log("Data Source initialized");
  })
  .catch((error) =>
    console.error("Error during Data Source initialization", error)
  );

const app = express();

app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());

app.use("/auth", authRouter);
app.use("/users", userRouter);
app.use("/friend", friendRouter);

app.listen(3002);
