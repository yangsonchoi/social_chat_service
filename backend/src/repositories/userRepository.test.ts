import {
  createTestDatabase,
  destroyTestDatabase,
} from "../config/testDatabaseConfig";
import { UserRepository } from "./userRepository";
import { User } from "../entities/userEntity";
import { DataSource } from "typeorm";

function delay(duration: number) {
  return new Promise((resolve) => setTimeout(resolve, duration));
}

describe("User Repository Tests", () => {
  let dataSource: DataSource;
  let userRepository: UserRepository;

  beforeAll(async () => {
    try {
      dataSource = await createTestDatabase("test_user_repo");

      userRepository = new UserRepository(dataSource);
    } catch (error) {
      console.error(error);
    }
  });

  afterAll(async () => {
    await destroyTestDatabase(dataSource);
  });

  it("should save a user", async () => {
    const user = new User();
    user.username = "testuser3";
    user.password = "password";
    const savedUser = await userRepository.saveUser(user);

    expect(savedUser).toBeDefined();
    expect(savedUser.username).toMatch("testuser3");
    expect(savedUser.password).toMatch("password");
    expect(savedUser.createdAt).toBeDefined();
  });

  // More tests...
});
