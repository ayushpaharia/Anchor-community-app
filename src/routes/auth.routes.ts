import { Router } from "express";
import {
  registerUserHandler,
  loginUserHandler,
  getMyProfileHandler,
  logoutHandler,
} from "../controllers/auth.controller";
import isAuthenticated from "../middlewares/isAuthenticated";

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
 * @route   GET /api/auth/me
 * @desc    Login a user
 */
authRoutes.get("/me", isAuthenticated, getMyProfileHandler);

/**
 * @route   GET /api/auth/me
 * @desc    Login a user
 */
authRoutes.get("/logout", isAuthenticated, logoutHandler);

export default authRoutes;
