import { DataSource, Repository } from "typeorm";
import { User } from "./userEntity";
import {
  createTestDatabase,
  destroyTestDatabase,
} from "../config/testDatabaseConfig";

describe("User entity test", () => {
  let testDataSource: DataSource;
  let userRepository: Repository<User>;

  beforeAll(async () => {
    const { testDataSource: dataSource, userRepository: repo } =
      await createTestDatabase();
    userRepository = repo;
    testDataSource = dataSource;
  });

  afterAll(async () => {
    await destroyTestDatabase(testDataSource);
  });

  it("Should create a user", async () => {
    // Create a user
    const userSave = await userRepository.create({ username: "testuser" });
    await userRepository.save(userSave);

    // User id should be generated
    expect(userSave.id).toBeDefined();

    // Get user
    const userLoad = await userRepository.findOne({
      where: { id: userSave.id },
    });

    // Check user
    expect(userLoad).toBeTruthy();
    if (userLoad) {
      expect(userLoad.username).toBe("testuser");
    }
  });

  it("should not allow duplicate usernames", async () => {
    // Create the first user
    const user1 = await userRepository.create({
      username: "uniqueUser",
      password: "password123",
    });
    await userRepository.save(user1);

    // Try to create same user
    try {
      const user2 = await userRepository.create({
        username: "uniqueUser",
        password: "password123",
      });
      await userRepository.save(user2);

      // If the save succeeds, the test should fail
      fail("Should not allow two users with the same username");
    } catch (error) {
      if (error instanceof Error) {
        expect(error.message).toMatch(/ER_DUP_ENTRY/);
      }
    }
  });

  // it("should not allow creating a user without a username", async () => {
  //   try {
  //     const user = userRepository.create({ password: "password123" });
  //     await userRepository.save(user);

  //     // If the save succeeds, the test should fail
  //     fail("should not allow creating a user without a username");
  //   } catch (error) {
  //     if (error instanceof Error) {
  //       expect(error.message).toMatch(
  //         /column "username" violates not-null constraint/
  //       );
  //     }
  //   }
  // });

  // it("should not allow creating a user without a password", async () => {
  //   try {
  //     const user = userRepository.create({ username: "testuser2" });
  //     await userRepository.save(user);

  //     console.log(user)
  //     const userLoad = await userRepository.findOne({
  //       where: { id: user.id },
  //     });
  //     console.log(userLoad);
  //     // If the save succeeds, the test should fail
  //     fail("should not allow creating a user without a password");
  //   } catch (error) {
  //     if (error instanceof Error) {
  //       expect(error.message).toMatch(
  //         /column "password" violates not-null constraint/
  //       );
  //     }
  //   }
  // });
});
