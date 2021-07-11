import { IsEmail, Length, Matches, IsNotEmpty } from "class-validator";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  Index,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
} from "typeorm";
import bcrypt from "bcrypt";
import config from "config";
import { classToPlain, Exclude } from "class-transformer";

@Entity("users")
export class User extends BaseEntity {
  constructor(user: Partial<User>) {
    super();
    Object.assign(this, user);
  }
  @Exclude()
  @PrimaryGeneratedColumn()
  id: number;

  @Index()
  @IsNotEmpty({ message: "Must have an email property" })
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

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // Hashes password before saving
  @BeforeInsert()
  async hashWithBCryptc() {
    const salt = await bcrypt.genSalt(config.get("saltWorkFactor"));

    this.password = bcrypt.hashSync(this.password, salt);
  }

  toJSON() {
    return classToPlain(this);
  }
}
