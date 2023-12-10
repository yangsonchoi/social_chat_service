import { DataSource, Repository } from "typeorm";
import { Friendship } from "../entities/friendshipEntity";
import { FriendRequest } from "../entities/friendRequestEntity";

export class FriendRepository {
  protected friendshipRepository: Repository<Friendship>;
  protected friendRequestRepository: Repository<FriendRequest>;

  constructor(dataSource: DataSource) {
    this.friendshipRepository = dataSource.getRepository(Friendship);
    this.friendRequestRepository = dataSource.getRepository(FriendRequest);
  }

  async makeFriendRequest(
    requesterId: number,
    addresseeId: number
  ): Promise<FriendRequest> {
    const friendRequest = this.friendRequestRepository.create({
      requesterId,
      addresseeId,
    });
    return this.friendRequestRepository.save(friendRequest);
  }

  async deleteFriendRequest(
    requesterId: number,
    addresseeId: number
  ): Promise<void> {
    await this.friendRequestRepository.delete({ requesterId, addresseeId });
  }

  async makeFriendship(user1Id: number, user2Id: number): Promise<Friendship> {
    const friendship = this.friendshipRepository.create({ user1Id, user2Id });
    return this.friendshipRepository.save(friendship);
  }

  async deleteFriendship(user1Id: number, user2Id: number): Promise<void> {
    await this.friendshipRepository.delete({ user1Id, user2Id });
  }

  async countUserFriendships(userId: number): Promise<number> {
    const count = await this.friendshipRepository
      .createQueryBuilder("friendship")
      .where("friendship.user1Id = :userId OR friendship.user2Id = :userId", {
        userId,
      })
      .getCount();

    return count;
  }

  async getAllFriendsList(userId: number): Promise<number[]> {
    const friendships = await this.friendshipRepository
      .createQueryBuilder("friendship")
      .where("friendship.user1Id = :userId", { userId })
      .orWhere("friendship.user2Id = :userId", { userId })
      .getMany();

    const friendIds = friendships.flatMap((friendship) => {
      return [
        friendship.user1Id === userId ? friendship.user2Id : null,
        friendship.user2Id === userId ? friendship.user1Id : null,
      ].filter((id) => id !== null) as number[];
    });

    return Array.from(new Set(friendIds));
  }

  async getAllFriendRequestsList(userId: number): Promise<number[]> {
    const friendRequests = await this.friendRequestRepository
      .createQueryBuilder("friendRequest")
      .where("friendRequest.requesterId = :userId", { userId })
      .select("friendRequest.addresseeId")
      .getMany();

    const addresseeIds = friendRequests.map((fr) => fr.addresseeId);

    return Array.from(addresseeIds);
  }

  async getAllAddressedFriendsList(userId: number): Promise<number[]> {
    const friendAddressed = await this.friendRequestRepository
      .createQueryBuilder("friendRequest")
      .where("friendRequest.addresseeId = :userId", { userId })
      .select("friendRequest.requesterId")
      .getMany();

    const requesterIds = friendAddressed.map((fr) => fr.requesterId);

    return Array.from(requesterIds);
  }
}
