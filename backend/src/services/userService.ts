import { UserRepository } from "../repositories/userRepository";
import { User } from "../entities/userEntity";
import { DataSource } from "typeorm";

export class UserService {
  private userRepository: UserRepository;

  constructor(dataSource: DataSource) {
    this.userRepository = new UserRepository(dataSource);
  }

  async createUser(userData: User): Promise<User> {
    return this.userRepository.saveUser(userData);
  }

  async getUserById(id: number): Promise<User | null> {
    return this.userRepository.findUserById(id);
  }

  async getUserWithPasswordByName(name: string): Promise<User | null> {
    return this.userRepository.findUserWithPasswordByName(name);
  }

  async getAllUsers(): Promise<User[]> {
    return this.userRepository.findAllUsers();
  }

  async userExists(userId: number): Promise<boolean> {
    const user = await this.userRepository.findUserById(userId);
    return !!user;
  }
}
