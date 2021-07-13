import { Router } from "express";
import {
  registerUserHandler,
  loginUserHandler,
  getProfileHandler,
} from "../controllers/auth.controller";

const authRoutes = Router();

/**
 * @route   POST /api/auth/register
 * @desc    Register a user
 */
authRoutes.post("/register", registerUserHandler);

/**
 * @route   POST /api/auth/login
 * @desc    Login a user
 */
authRoutes.post("/login", loginUserHandler);

/**
 * @route   POST /api/auth/me
 * @desc    Login a user
 */
authRoutes.get("/me", getProfileHandler);

export default authRoutes;
