import { validate, isEmpty } from "class-validator";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import config from "config";

import { User } from "../entities/User";
import { sign } from "../utils/jwt.utils";

export const registerUserHandler = async (req: Request, res: Response) => {
  const { email, username, password } = req.body;

  try {
    // TODO: Validate Data
    const validationErrors: string[] = [];
    if (await User.findOne({ email }))
      validationErrors.push("Email already taken");
    if (await User.findOne({ username }))
      validationErrors.push("Username already taken");
    if (validationErrors.length > 0) {
      return res.status(400).json({ errors: validationErrors });
    }

    // TODO: Create the user
    // const user = User.create({});
    const user = new User({ email, password, username });

    let fieldValidationErrors = await validate(user);
    if (fieldValidationErrors.length > 0)
      return res.status(400).json({ fieldValidationErrors });

    await user.save();

    // TODO: Return the user
    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

export const loginUserHandler = async (req: Request, res: Response) => {
  // const { emailOrUsername, password } = req.body;
  const { username, password } = req.body;

  try {
    const validationErrors: string[] = [];
    if (isEmpty(username)) validationErrors.push("Username must not be empty");
    if (isEmpty(password)) validationErrors.push("Password must not be empty");
    if (validationErrors.length > 0)
      return res.status(400).json({ errors: validationErrors });

    // TODO: Find User
    const registeredUser = await User.findOne({ username });
    if (!registeredUser)
      return res.status(404).json({ error: "User not found" });

    // TODO: Compare Password
    const passwordMatch = await bcrypt.compare(
      password,
      registeredUser.password
    );
    if (!passwordMatch)
      res.status(401).json({ password: "Password is incorrect" });

    const token = sign({ username });

    // TODO: Return User
    return res.status(200).json({ user: registeredUser, token });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};
