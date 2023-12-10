import express from 'express'
import { AppDataSource } from "./config/typeOrmConfig";
import userRouter from "./routes/userRoutes"
import authRouter from "./routes/authRoutes"
import friendRouter from "./routes/friendRoutes"

AppDataSource.initialize()
  .then(() => {
	console.log("Data Source initialized");
  })
  .catch((error) => console.error("Error during Data Source initialization", error));

const app = express();

app.use(express.json());

app.use("/auth", authRouter);
app.use("/users", userRouter);
app.use("/friend", friendRouter);


app.listen(3002);