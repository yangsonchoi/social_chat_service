import { DataSource, Repository } from "typeorm";
import { User } from "../entities/userEntity";
import dotenv from "dotenv";

dotenv.config();

export const createTestDatabase = async (testDb: string) => {
  const testDataSource = new DataSource({
    type: "mysql",
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT!),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: testDb,
    dropSchema: true,
    entities: [User],
    synchronize: true,
    logging: false,
  });

  await testDataSource.initialize();

  return testDataSource;
};

export const destroyTestDatabase = async (testDataSource: DataSource) => {
  await testDataSource.destroy();
};
