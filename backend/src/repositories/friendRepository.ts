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

  async makeFriendRequest(requesterId: number, addresseeId: number): Promise<FriendRequest> {
    const friendRequest = this.friendRequestRepository.create({ requesterId, addresseeId });
    return this.friendRequestRepository.save(friendRequest);
  }

  async deleteFriendRequest(requesterId: number, addresseeId: number): Promise<void> {
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
        .where("friendship.user1Id = :userId OR friendship.user2Id = :userId", { userId })
        .getCount();

    return count;
  }
}