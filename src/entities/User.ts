import { IsEmail, Length } from "class-validator";
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
  @IsEmail()
  @Column({ unique: true })
  email: string;

  @Index()
  @Length(3, 255, { message: "Username must be 3 charcters or longer" })
  @Column({ unique: true })
  username: string;

  @Exclude()
  @Column()
  @Length(6)
  password: string;

  @CreateDateColumn()
  createAt: Date;

  @UpdateDateColumn()
  updateAt: Date;

  @BeforeInsert()
  async hashWithBCryptc() {
    const salt = await bcrypt.genSalt(config.get("saltWorkFactor"));

    this.password = bcrypt.hashSync(this.password, salt);
  }

  toJSON() {
    return classToPlain(this);
  }
}
