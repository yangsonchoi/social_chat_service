import { DataSource, Repository } from "typeorm";
import { User } from "./userEntity";
import { createTestDatabase, destroyTestDatabase } from "../config/testDatabaseConfig";

let testDataSource: DataSource;
let userRepository: Repository<User>;

beforeAll(async () => {
    const { testDataSource: dataSource, userRepository: repo } = await createTestDatabase();
    userRepository = repo;
    testDataSource = dataSource;
  });
  
  afterAll(async () => {
    await destroyTestDatabase(testDataSource);
  });

test("Should create a user", async () => {
  const user = userRepository.create({ username: "testuser" });
  await userRepository.save(user);

  expect(user.id).toBeDefined();
  expect(user.username).toBe("testuser");
});