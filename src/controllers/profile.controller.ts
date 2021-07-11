import { Request, Response } from "express";
import config from "config";
import jwt from "jsonwebtoken";

export const getProfileHandler = async (req: Request, res: Response) => {
  try {
    const token = req.cookies.token;
    if (!token) throw new Error("Unauthenticated");

    const username = jwt.verify(token, config.get("jwt_secret"));

    return res.json({ message: "test" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
