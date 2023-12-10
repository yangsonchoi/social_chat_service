import { UserRepository } from "../repositories/userRepository";
import { User } from "../entities/userEntity";
import { DataSource } from "typeorm";
import { FriendRepository } from "../repositories/friendRepository";

export class UserService {
  private userRepository: UserRepository;
  private friendRepository: FriendRepository;

  constructor(dataSource: DataSource) {
    this.userRepository = new UserRepository(dataSource);
    this.friendRepository = new FriendRepository(dataSource);
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

  async getAllUsersWithFriendCounts(): Promise<any[]> {
    const users = await this.userRepository.findAllUsers();
    const usersWithFriendCounts = await Promise.all(users.map(async (user) => {
      const friendCount = await this.friendRepository.countUserFriendships(user.id);
      return { ...user, friendCount };
    }));
    return usersWithFriendCounts;
  }

  async getUsersByIds(userIds: number[]): Promise<User[]> {
    return this.userRepository.findUsersByIds(userIds);
  }
}
