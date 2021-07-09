import { Router } from "express";
import {
  registerUserHandler,
  loginUserHandler,
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

export default authRoutes;
