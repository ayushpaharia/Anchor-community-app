import {
  BeforeInsert,
  Column,
  Entity as typeormEntity,
  Index,
  JoinColumn,
  ManyToOne,
} from "typeorm";
// import { isNotEmpty } from "class-validator";

import { id_generator } from "../utils/id_generator.utils";
import DefaultCoulmnsEntity from "./DefaultColumnsEntity";
import Post from "./Post";
import User from "./User";

@typeormEntity("comments")
export default class Comment extends DefaultCoulmnsEntity {
  constructor(comment: Partial<Comment>) {
    super();
    Object.assign(this, comment);
  }

  @Index()
  @Column()
  identifier: string;

  @Column()
  body: string;

  @Column()
  username: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: "username", referencedColumnName: "username" })
  user: User;

  @ManyToOne(() => Post, (post) => post.comments, { nullable: false })
  post: Post;

  @BeforeInsert()
  generateId() {
    this.identifier = id_generator(8);
  }
}
