import { omit } from "lodash";

const myObj = {
  post: {
    title: "Gohan is Trash now",
    body: "Where Powerup?",
    subName: "react js",
    user: {
      createdAt: "2021-07-14T17:51:53.536Z",
      updatedAt: "2021-07-14T17:51:53.536Z",
      email: "sampleuser@email.com",
      username: "sampleuser",
    },
    sub: {
      createdAt: "2021-07-14T17:58:36.120Z",
      updatedAt: "2021-07-14T17:58:36.120Z",
      name: "react js",
      title: "ReactJS",
      description: "sub about react",
      imageURN: null,
      bannerURN: null,
    },
    indentifier: "8SoMZDch",
    slug: "gohan_is_trash_now",
    createdAt: "2021-07-14T18:05:10.961Z",
    updatedAt: "2021-07-14T18:05:10.961Z",
  },
  message: "Post succesfully created by sampleuser",
};

const newObj = omit(myObj, [
  "post.user.updatedAt",
  "post.user.createdAt",
  "post.slug",
]);

console.log(newObj);
