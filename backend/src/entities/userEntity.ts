import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
} from "typeorm";
import { FriendRequest } from "./friendRequestEntity";
import { Friendship } from "./friendshipEntity";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true, nullable: false })
  username!: string;

  @Column({ nullable: false })
  password!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @OneToMany(() => FriendRequest, friendRequest => friendRequest.requester)
  sentRequests!: FriendRequest[];

  @OneToMany(() => FriendRequest, friendRequest => friendRequest.addressee)
  receivedRequests!: FriendRequest[];

  @OneToMany(() => Friendship, friendship => friendship.user1)
  friendships1!: Friendship[];

  @OneToMany(() => Friendship, friendship => friendship.user2)
  friendships2!: Friendship[];
}
