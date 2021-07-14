import { IsNotEmpty } from "class-validator";
import {
  BeforeInsert,
  Column,
  Entity as typeormEntity,
  Index,
  JoinColumn,
  ManyToOne,
} from "typeorm";

import { id_generator } from "../utils/id_generator.utils";
import { slugify } from "../utils/slugify.utils";

import DefaultCoulmnsEntity from "./DefaultColumnsEntity";
import { Sub } from "./Sub";
import User from "./User";

@typeormEntity("posts")
export class Post extends DefaultCoulmnsEntity {
  constructor(post: Partial<Post>) {
    super();
    Object.assign(this, post);
  }
  @Index()
  @Column()
  indentifier: string; // id

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

  // Hashes password before saving
  @BeforeInsert()
  generateIdAndSlugify() {
    this.indentifier = id_generator(8);
    this.slug = slugify(this.title);
  }
}
