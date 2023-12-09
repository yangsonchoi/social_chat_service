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
    const userSave = userRepository.create({ username: "testuser" });
    await userRepository.save(userSave);

    expect(userSave.id).toBeDefined();

    const userLoad = await userRepository.findOne({
      where: { id: userSave.id },
    });

    expect(userLoad).toBeTruthy();
    if (userLoad) {
      expect(userLoad.username).toBe("testuser");
    }
  });
});
