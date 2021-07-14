import { Router } from "express";
import {
  createSubHandler,
  deleteSubHandler,
  editSubHandler,
  getAllSubsHandler,
  getSubHandler,
} from "../controllers/sub.controller";
import isAuthenticated from "../middlewares/isAuthenticated";
// import isAuthenticated from "../middlewares/isAuthenticated";

const subsRoutes = Router();

/**
 * @route   POST /api/subs
 * @desc    Create a sub
 */
subsRoutes.post("/", isAuthenticated, createSubHandler);

/**
 * @route   GET /api/subs/:subname
 * @desc    Get a single sub
 */
subsRoutes.get("/:subname", getSubHandler);
/**
 * @route   GET ALL /api/subs
 * @desc    Get all subs
 */
subsRoutes.get("/", getAllSubsHandler);

/**
 * @route   PUT /api/subs/:subname
 * @desc    Edit one post
 */
subsRoutes.put("/:subname", editSubHandler);

/**
 * @route   DELETE /api/subs/:subname
 * @desc    Login a user
 */
subsRoutes.delete("/:subname", deleteSubHandler);

export default subsRoutes;
