// import { IsNotEmpty } from "class-validator";
// import {
//   Column,
//   Entity as typeormEntity,
//   Index,
//   JoinColumn,
//   ManyToMany,
//   ManyToOne,
// } from "typeorm";

// import DefaultCoulmnsEntity from "./Entity";
// import User from "./User";

// @typeormEntity("posts")
// export class Post extends DefaultCoulmnsEntity {
//   constructor(post: Partial<Post>) {
//     super();
//     Object.assign(this, post);
//   }
//   @Index()
//   @Column()
//   indentifier: string; // id

//   @Column()
//   @IsNotEmpty({ message: "Title must not be empty" })
//   title: string;

//   @Index()
//   @Column()
//   slug: string; // Slug for a id

//   @Column({ nullable: true, type: "text" })
//   body: string;

//   @Column()
//   sub: string;

//   @ManyToOne(() => User, (user) => user.posts)
//   @JoinColumn({ name: "username", referencedColumnName: "username" })
//   user: User;
// }
