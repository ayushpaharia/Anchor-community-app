import { Router } from "express";
import {
  createPostHandler,
  getPostHandler,
  getAllPostHandler,
  editPostHandler,
  deletePostHandler,
} from "../controllers/post.controller";
// import isAuthenticated from "../middlewares/isAuthenticated";

const postRoutes = Router();

/**
 * @route   POST /api/posts/create
 * @desc    Create a post
 */
postRoutes.post("/", createPostHandler);

/**
 * @route   GET /api/posts/:postid
 * @desc    Get a single post
 */
postRoutes.get("/:postid", getPostHandler);
/**
 * @route   GET ALL /api/posts/:postid
 * @desc    Get all posts
 */
postRoutes.get("/", getAllPostHandler);

/**
 * @route   GET /api/auth/me
 * @desc    Edit one post
 */
postRoutes.put("/:postid", editPostHandler);

/**
 * @route   GET /api/auth/me
 * @desc    Login a user
 */
postRoutes.delete("/:postid", deletePostHandler);

export default postRoutes;
