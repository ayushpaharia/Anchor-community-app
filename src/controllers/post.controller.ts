import { Request, Response } from "express";
import { Post } from "../entities/Post";

export const createPostHandler = async (req: Request, res: Response) => {
  const { title, body, sub } = req.body;
  try {
    // Check if user exists
    const user = res.locals.user;

    // TODO: Find sub
    const newPost = new Post({ title, body, user, sub });
    await newPost.save();

    // Return the user
    return res.status(200).json({
      post: newPost,
      message: `Post succesfully created by ${user.username}`,
    });
  } catch (error) {
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
