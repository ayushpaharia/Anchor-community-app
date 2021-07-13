import { Request, Response } from "express";
import { decode } from "../utils/jwt.utils";
import { findExistingUser } from "../services/user.service";

export const getProfileHandler = async (req: Request, res: Response) => {
  try {
    const token = req.cookies.token;
    if (!token) throw new Error("Unauthenticated");

    const { valid, expired, decoded }: any = decode(token);
    // console.log({ valid, expired, decoded });

    const { existingUser } = await findExistingUser(decoded, "return");
    // const existingUser = await User.findOne({ username: decoded.username });

    if (!existingUser) throw new Error("Unauthenticated");
    return res.status(200).json({
      message: `Profile of ${existingUser.username}`,
      user: existingUser,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
