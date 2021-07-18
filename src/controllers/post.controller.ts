import { Request, Response } from "express";
import { omit } from "lodash";
import Comment from "../entities/Comment";

import Post from "../entities/Post";
import Sub from "../entities/Sub";

export const createPostHandler = async (req: Request, res: Response) => {
  const { title, body, sub } = req.body;
  try {
    // Check if user exists
    const user = res.locals.user;

    const existingSub = await Sub.findOne({ name: sub });

    if (!existingSub)
      return res.status(400).json({ message: "Sub doesn't exist" });

    const newPost = Post.create({ title, body, user, sub: existingSub });
    await newPost.save();

    const post = omit(newPost.toJSON(), [
      "user.updatedAt",
      "user.createdAt",
      "updatedAt",
      "sub.updatedAt",
    ]);

    // Return the user
    return res.status(200).json({
      post,
      message: `Post succesfully created by ${user.username}`,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: "Something went wrong" });
  }
};

export const getPostHandler = async (req: Request, res: Response) => {
  const { identifier, slug } = req.params;

  try {
    const existingPost = await Post.findOneOrFail(
      { identifier, slug },
      { relations: ["sub", "comments"] }
    );

    return res.status(200).json({ post: existingPost });
  } catch (error) {
    return res.status(404).json({ error });
  }
};

export const getAllPostHandler = async (_: Request, res: Response) => {
  try {
    const allPosts = await Post.find({
      order: { createdAt: "DESC" },
      // relations: ["sub"],
    });

    return res.status(200).json({ post: allPosts });
  } catch (error) {
    return res.status(500).json({ error: "Something went wrong" });
  }
};

export const editPostHandler = async (_req: Request, _res: Response) => {};

export const deletePostHandler = async (_req: Request, _res: Response) => {};

export const commentOnPostHandler = async (req: Request, res: Response) => {
  const { identifier, slug } = req.params;
  const { body } = req.body;
  try {
    const existingPost = await Post.findOneOrFail({ identifier, slug });

    const comment = new Comment({
      body,
      user: res.locals.user,
      post: existingPost,
    });

    await comment.save();

    return res.status(200).json({ comment });
  } catch (error) {
    return res.status(404).json({ error: "Post not found" });
  }
};
