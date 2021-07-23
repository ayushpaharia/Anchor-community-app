import { IsEmail, Length, Matches, IsNotEmpty } from "class-validator";
import {
  Entity as typeorm_Entity,
  Column,
  Index,
  BeforeInsert,
  OneToMany,
  JoinColumn,
} from "typeorm";
import bcrypt from "bcrypt";
import config from "config";
import { Exclude } from "class-transformer";

import DefaultCoulmnsEntity from "./DefaultColumnsEntity";
import Post from "./Post";

@typeorm_Entity("users")
export default class User extends DefaultCoulmnsEntity {
  constructor(user: Partial<User>) {
    super();
    Object.assign(this, user);
  }

  @Index()
  @IsNotEmpty({ message: "Must be a valid email property" })
  @IsEmail({}, { message: "Must be a valid email" })
  @Column({ unique: true })
  email: string;

  @Index()
  @IsNotEmpty({ message: "Must have an username property" })
  @Length(3, 255, {
    message: "Username is too short - should be 3 characters or longer",
  })
  @Column({ unique: true })
  username: string;

  @Exclude()
  @Column()
  @IsNotEmpty({ message: "Must have an password property" })
  @Length(6, 255, {
    message: "Password is too short - should be 6 characters or longer",
  })
  @Matches(/^[a-zA-Z0-9._-]*$/, {
    message:
      "Password can only contain alphabets, numbers , underscores, periods and dashes",
  })
  password: string;

  @OneToMany(() => Post, (post) => post.user)
  @JoinColumn({ name: "username", referencedColumnName: "username" })
  posts: Post[];

  // Hashes password before saving
  @BeforeInsert()
  async hashWithBCrypt() {
    const salt = await bcrypt.genSalt(config.get("saltWorkFactor"));

    this.password = bcrypt.hashSync(this.password, salt);
  }
}
