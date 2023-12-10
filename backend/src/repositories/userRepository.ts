import { DataSource, In, Repository } from "typeorm";
import { User } from "../entities/userEntity";

export class UserRepository {
  protected userRepository: Repository<User>;

  constructor(dataSource: DataSource) {
    this.userRepository = dataSource.getRepository(User);
  }

  async saveUser(userData: User): Promise<User> {
    return this.userRepository.save(userData);
  }

  async findUserById(id: number): Promise<User | null> {
    return this.userRepository.findOne({
      select: ["id", "username", "createdAt"],
      where: { id: id },
    });``
  }

  async findUserWithPasswordByName(name: string): Promise<User | null> {
    return this.userRepository.findOne({
      select: ["id", "username", "password", "createdAt"],
      where: { username: name },
    });
  }

  async findAllUsers(): Promise<User[]> {
    return this.userRepository.find({
      select: ["id", "username", "createdAt"],
    });
  }

  async findUsersByIds(userIds: number[]): Promise<User[]> {
    return this.userRepository.find({
      select: ["id", "username", "createdAt"],
      where: {
        id: In(userIds),
      },
    });
  }
}
