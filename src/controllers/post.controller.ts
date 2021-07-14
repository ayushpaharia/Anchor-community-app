import { Request, Response } from "express";
import { omit } from "lodash";
import { Post } from "../entities/Post";
import { Sub } from "../entities/Sub";

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

export const getPostHandler = async (req: Request, res: Response) => {};

export const getAllPostHandler = async (req: Request, res: Response) => {};

export const editPostHandler = async (req: Request, res: Response) => {};

export const deletePostHandler = async (req: Request, res: Response) => {};

export default {
  createPostHandler,
  getPostHandler,
  getAllPostHandler,
  editPostHandler,
  deletePostHandler,
};
