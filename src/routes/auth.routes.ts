import { Request, Response, Router } from "express";
import { validate } from "class-validator";

import { User } from "../entities/User";

const register = async (req: Request, res: Response) => {
  const { email, username, password } = req.body;

  try {
    // TODO: Validate Data
    let validationErrors: any = {};
    const emailUser = await User.findOne({ email });
    const usernameUser = await User.findOne({ username });

    if (emailUser) validationErrors.email = "Email already taken";
    if (usernameUser) validationErrors.username = "Username already taken";

    if (Object.keys(validationErrors.length > 0)) {
      res.status(400).json({ errors: validationErrors });
    }

    // TODO: Create the user
    // const user = User.create({});
    const user = new User({ email, password, username });

    validationErrors = await validate(user);
    if (validationErrors.length > 0)
      return res.status(400).json({ validationErrors });

    await user.save();

    // TODO: Return the user
    return res.json(user);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

const authRoutes = Router();

authRoutes.post("/register", register);

export default authRoutes;
