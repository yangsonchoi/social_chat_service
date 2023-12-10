import { DataSource } from "typeorm";
import { User } from "../entities/userEntity";
import dotenv from "dotenv";
import { FriendRequest } from "../entities/friendRequestEntity";
import { Friendship } from "../entities/friendshipEntity";

dotenv.config();

const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT!),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [User, FriendRequest, Friendship],
  synchronize: true,
  // logging: true,
});

export { AppDataSource };