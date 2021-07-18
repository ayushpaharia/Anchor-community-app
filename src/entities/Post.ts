import { IsNotEmpty } from "class-validator";
import {
  BeforeInsert,
  Column,
  Entity as typeormEntity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";

import { id_generator } from "../utils/id_generator.utils";
import { slugify } from "../utils/slugify.utils";
import Comment from "./Comment";

import DefaultCoulmnsEntity from "./DefaultColumnsEntity";
import Sub from "./Sub";
import User from "./User";

@typeormEntity("posts")
export default class Post extends DefaultCoulmnsEntity {
  constructor(post: Partial<Post>) {
    super();
    Object.assign(this, post);
  }
  @Index()
  @Column()
  identifier: string; // id

  @Column()
  @IsNotEmpty({ message: "Title must not be empty" })
  title: string;

  @Index()
  @Column()
  slug: string; // Slug for a id

  @Column({ nullable: true, type: "text" })
  body: string;

  @Column()
  subName: string;

  @ManyToOne(() => User, (user) => user.posts)
  @JoinColumn({ name: "username", referencedColumnName: "username" })
  user: User;

  @ManyToOne(() => Sub, (sub) => sub.posts) 
  @JoinColumn({ name: "subName", referencedColumnName: "name" })
  sub: Sub;

  @OneToMany(() => Comment, (comment) => comment.post)
  @JoinColumn({ name: "subName", referencedColumnName: "name" })

  comments: Comment[];

  // Hashes password before saving
  @BeforeInsert()
  generateIdAndSlugify() {
    this.identifier = id_generator(8);
    this.slug = slugify(this.title);
  }
}
