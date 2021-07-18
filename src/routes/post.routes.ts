import { Router } from "express";
import {
  createPostHandler,
  getPostHandler,
  getAllPostHandler,
  editPostHandler,
  deletePostHandler,
  commentOnPostHandler,
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
 * @route   GET /api/posts/:identifier/:slug
 * @desc    Get a single post
 */
postRoutes.get("/:identifier/:slug", getPostHandler);

/**
 * @route   GET ALL /api/posts
 * @desc    Get all posts
 */
postRoutes.get("/", getAllPostHandler);

/**
 * @route   PUT /api/posts/:identifier/:slug
 * @desc    Edit one post
 */
postRoutes.put("/:identifier/:slug", isAuthenticated, editPostHandler);

/**
 * @route   DELETE /api/posts/:identifier/:slug
 * @desc    Delete a post
 */
postRoutes.delete("/:identifier/:slug", isAuthenticated, deletePostHandler);

/**
 * @route   POST /api/posts/:identifier/:slug/comments
 * @desc    Comment on a post
 */
postRoutes.post(
  "/:identifier/:slug/comments",
  isAuthenticated,
  commentOnPostHandler
);

export default postRoutes;
