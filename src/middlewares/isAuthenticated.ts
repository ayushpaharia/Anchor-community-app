import { NextFunction, Request, Response } from "express";

import { findExistingUser } from "../services/user.service";
import { decode } from "../utils/jwt.utils";

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies.token;
    if (!token) throw new Error("Unauthenticated");

    const { valid, expired, decoded }: any = decode(token);

    const existingUser = await findExistingUser(decoded, "return");

    if (!existingUser) throw new Error("Unauthenticated");
    res.locals.user = existingUser;

    return next();
  } catch (err) {
    res.status(401).json({ error: "Unauthenticated" });
  }
};
