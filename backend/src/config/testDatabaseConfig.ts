import { DataSource, Repository } from "typeorm";
import { User } from "../entities/userEntity";
import dotenv from "dotenv";

dotenv.config();

export const createTestDatabase = async () => {
  const testDataSource = new DataSource({
    type: "mysql",
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT!),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE_TEST,
    dropSchema: true,
    entities: [User],
    synchronize: true,
    logging: false,
  });

  await testDataSource.initialize();

  const userRepository = testDataSource.getRepository(User);

  return { testDataSource, userRepository };
};

export const destroyTestDatabase = async (testDataSource: DataSource) => {
  await testDataSource.destroy();
};
