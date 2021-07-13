import { Request, Response } from "express";
import config from "config";
import jwt from "jsonwebtoken";
import { findExistingUser } from "../services/user.service";
import { User } from "../entities/User";

export const getProfileHandler = async (req: Request, res: Response) => {
  try {
    const token = req.cookies.token;
    console.log(token);

    if (!token) throw new Error("Unauthenticated");

    const { username }: any = jwt.verify(token, config.get("jwt_secret"));

    // const { existingUser } = await findExistingUser(payload, "return");

    const existingUser = await User.findOne(username);
    if (!existingUser) throw new Error("Unauthenticated");
    return res
      .status(200)
      .json({ message: `Profile of ${existingUser.username}` });

    return res.json({ message: "test" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
