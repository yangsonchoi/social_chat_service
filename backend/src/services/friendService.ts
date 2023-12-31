import { FriendRepository } from "../repositories/friendRepository";
import { UserService } from "./userService";
import { DataSource } from "typeorm";
import { Friendship } from "../entities/friendshipEntity";
import { FriendRequest } from "../entities/friendRequestEntity";
import { User } from "../entities/userEntity";

export class FriendService {
  private friendRepository: FriendRepository;
  private userService: UserService;

  constructor(dataSource: DataSource) {
    this.friendRepository = new FriendRepository(dataSource);
    this.userService = new UserService(dataSource);
  }

  async requestFriend(
    requesterId: number,
    addresseeId: number
  ): Promise<FriendRequest> {
    if (
      !(await this.userService.userExists(requesterId)) ||
      !(await this.userService.userExists(addresseeId))
    ) {
      throw new Error("User does not exist");
    }
    return this.friendRepository.makeFriendRequest(requesterId, addresseeId);
  }

  async acceptFriend(
    requesterId: number,
    addresseeId: number
  ): Promise<Friendship> {
    if (
      !(await this.userService.userExists(requesterId)) ||
      !(await this.userService.userExists(addresseeId))
    ) {
      throw new Error("User does not exist");
    }

    const [user1Id, user2Id] = [requesterId, addresseeId].sort((a, b) => a - b);
    await this.friendRepository.deleteFriendRequest(requesterId, addresseeId);
    return this.friendRepository.makeFriendship(user1Id, user2Id);
  }

  async declineFriend(requesterId: number, addresseeId: number): Promise<void> {
    if (
      !(await this.userService.userExists(requesterId)) ||
      !(await this.userService.userExists(addresseeId))
    ) {
      throw new Error("User does not exist");
    }

    await this.friendRepository.deleteFriendRequest(requesterId, addresseeId);
  }

  async deleteFriend(user1Id: number, user2Id: number): Promise<void> {
    try {
      await this.friendRepository.deleteFriendship(user1Id, user2Id);
    } catch (error) {
      throw new Error("Error deleting friendship");
    }
  }

  async countFriends(userId: number): Promise<number> {
    if (!(await this.userService.userExists(userId))) {
      throw new Error("User does not exist");
    }
    return this.friendRepository.countUserFriendships(userId);
  }

  async getAllFriendsList(userId: number): Promise<number[]> {
    if (!(await this.userService.userExists(userId))) {
      throw new Error("User does not exist");
    }
    return this.friendRepository.getAllFriendsList(userId);
  }

  async getAllFriendRequestsList(userId: number): Promise<number[]> {
    if (!(await this.userService.userExists(userId))) {
      throw new Error("User does not exist");
    }
    return this.friendRepository.getAllFriendRequestsList(userId);
  }

  async getAllAddressedFriendsList(userId: number): Promise<number[]> {
    if (!(await this.userService.userExists(userId))) {
      throw new Error("User does not exist");
    }
    return this.friendRepository.getAllAddressedFriendsList(userId);
  }
}
