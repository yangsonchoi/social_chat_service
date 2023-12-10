import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from "typeorm";
import { User } from "./userEntity";

@Entity()
export class FriendRequest {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  requesterId!: number;

  @Column()
  addresseeId!: number;

  @ManyToOne(() => User, (user) => user.sentRequests)
  requester!: User;

  @ManyToOne(() => User, (user) => user.receivedRequests)
  addressee!: User;

  @CreateDateColumn()
  createdAt!: Date;
}
