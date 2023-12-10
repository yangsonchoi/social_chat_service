import express from 'express'
import { AppDataSource } from "./config/typeOrmConfig";
import userRouter from "./routes/userRoutes"

AppDataSource.initialize()
  .then(() => {
	console.log("Data Source initialized");
  })
  .catch((error) => console.error("Error during Data Source initialization", error));

const app = express();

app.use(express.json());

// app.use("/users", userRouter);

app.listen(3002);