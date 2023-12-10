import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from "typeorm";
import { User } from "./userEntity";

@Entity()
export class Friendship {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  user1Id!: number;

  @Column()
  user2Id!: number;

  @ManyToOne(() => User, (user) => user.friendships1)
  user1!: User;

  @ManyToOne(() => User, (user) => user.friendships2)
  user2!: User;

  @CreateDateColumn()
  createdAt!: Date;
}
