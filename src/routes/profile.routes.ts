import { Router } from "express";
import { getProfileHandler } from "../controllers/profile.controller";

const profileRoutes = Router();

/**
 * @route   GET /api/profile/me
 * @desc    Get your profile
 */
profileRoutes.get("/me", getProfileHandler);

export default profileRoutes;
