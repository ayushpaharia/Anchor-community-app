// import { IsNotEmpty } from "class-validator";
import { IsNotEmpty } from "class-validator";
import {
  Column,
  Entity as typeormEntity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";

import DefaultCoulmnsEntity from "./DefaultColumnsEntity";
import Post from "./Post";
import User from "./User";

@typeormEntity("subs")
export default class Sub extends DefaultCoulmnsEntity {
  constructor(sub: Partial<Sub>) {
    super();
    Object.assign(this, sub);
  }

  @Index()
  @IsNotEmpty({ message: "Must have an name property" })
  @Column({ unique: true })
  name: string;

  @IsNotEmpty({ message: "Must have an title property" })
  @Column()
  title: string;

  @Column({ type: "text", nullable: true })
  description: string;

  @Column({ nullable: true })
  imageURN: string;

  @Column({ nullable: true })
  bannerURN: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: "username", referencedColumnName: "username" })
  user: User;

  @OneToMany(() => Post, (post) => post.sub)
  posts: Post[];
}
