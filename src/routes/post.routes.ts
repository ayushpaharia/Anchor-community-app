import { Router } from "express";
import {
  createPostHandler,
  getPostHandler,
  getAllPostHandler,
  editPostHandler,
  deletePostHandler,
} from "../controllers/post.controller";
import isAuthenticated from "../middlewares/isAuthenticated";
// import isAuthenticated from "../middlewares/isAuthenticated";

const postRoutes = Router();

/**
 * @route   POST /api/posts
 * @desc    Create a post
 */
postRoutes.post("/", isAuthenticated, createPostHandler);

/**
 * @route   GET /api/posts/:postid
 * @desc    Get a single post
 */
postRoutes.get("/:postid", getPostHandler);

/**
 * @route   GET ALL /api/posts
 * @desc    Get all posts
 */
postRoutes.get("/", getAllPostHandler);

/**
 * @route   PUT /api/posts/:postid
 * @desc    Edit one post
 */
postRoutes.put("/:postid", editPostHandler);

/**
 * @route   DELETE /api/posts/:postid
 * @desc    Delete a post
 */
postRoutes.delete("/:postid", deletePostHandler);

export default postRoutes;
