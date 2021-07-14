import { Request, Response } from "express";
import bcrypt from "bcrypt";
import config from "config";
import cookie from "cookie";

import User from "../entities/User";
import { sign } from "../utils/jwt.utils";
import { findExistingUser } from "../services/user.service";
import { validate } from "class-validator";

export const registerUserHandler = async (req: Request, res: Response) => {
  const { email, username, password, passwordConfirmation } = req.body;
  try {
    // Check if user exists
    const { existingUser, errors } = await findExistingUser(req.body);

    // If it exists return the errors
    if (existingUser === null) return res.status(400).json({ errors });

    if (password !== passwordConfirmation)
      return res
        .status(400)
        .json({ errors: "Password confirmation doesn't match" });

    // Create the user
    const newUser = new User({ email, username, password });
    const validationErrors = await validate(newUser);

    if (validationErrors.length !== 0)
      return res.status(400).json({ errors: validationErrors });
    await newUser.save();

    // Return the user
    return res
      .status(200)
      .json({ user: newUser, message: "User succesfully created!" });
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const loginUserHandler = async (req: Request, res: Response) => {
  try {
    // Find if User exists
    const { existingUser } = await findExistingUser(req.body, "return");

    if (!existingUser) return res.status(404).json({ error: "User not found" });

    // Compare Password
    const passwordMatch = await bcrypt.compare(
      req.body.password,
      existingUser.password
    );
    if (!passwordMatch)
      return res.status(401).json({ password: "Password is incorrect" });

    const token = sign(
      { username: existingUser.username },
      {
        expiresIn: "1h",
      }
    );

    // Set token in a cookies
    res.set(
      "Set-Cookie",
      cookie.serialize("token", token, {
        httpOnly: true,
        secure: config.get("node_env") === "development",
        sameSite: "strict",
        maxAge: 3600,
        path: "/",
      })
    );

    // Return User
    return res.status(200).json({ user: existingUser });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

export const getMyProfileHandler = (_: Request, res: Response) => {
  try {
    return res.status(200).json({
      message: `Profile of ${res.locals.user.username}`,
      user: res.locals.user,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const logoutHandler = async (_: Request, res: Response) => {
  try {
    res.set(
      "Set-Cookie",
      cookie.serialize("token", "", {
        httpOnly: true,
        secure: config.get("node_env") === "production",
        sameSite: "strict",
        expires: new Date(),
        path: "/",
      })
    );

    return res.status(200).json({ success: true });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
