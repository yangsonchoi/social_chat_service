import express from "express";
import { AppDataSource } from "./config/typeOrmConfig";
import userRouter from "./routes/userRoutes";
import authRouter from "./routes/authRoutes";
import friendRouter from "./routes/friendRoutes";
import cors from "cors";
import morgan from "morgan";
import { Server } from "socket.io";
import Socket from "./sockets/socket";

AppDataSource.initialize()
  .then(() => {
    console.log("Data Source initialized");
  })
  .catch((error) =>
    console.error("Error during Data Source initialization", error)
  );

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("combined"));

app.use("/auth", authRouter);
app.use("/users", userRouter);
app.use("/friend", friendRouter);

const server = app.listen(8080);
new Socket(server);