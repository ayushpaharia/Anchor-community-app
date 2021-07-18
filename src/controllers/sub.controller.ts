import { Request, Response } from "express";
import { omit } from "lodash";
import { getRepository } from "typeorm";
import Sub from "../entities/Sub";
import User from "../entities/User";

type NewType = Request;

export const createSubHandler = async (req: NewType, res: Response) => {
  const { name, title, description } = req.body;
  const user: User = res.locals.user;
  try {
    const sub = await getRepository(Sub)
      .createQueryBuilder("sub")
      .where("lower(sub.name) = :name", { name: name.toLowerCase() })
      .getOne();

    if (sub) throw new Error(`Sub with the name ${name} already exists`);
  } catch (error) {
    return res.status(400).json({ message: "Something went wrong", error });
  }

  try {
    const newSub = new Sub({ name, description, title, user });
    await newSub.save();

    const sub = omit(newSub.toJSON(), [
      "user.updatedAt",
      "user.createdAt",
      "updatedAt",
    ]);

    return res.json({ message: "Sub created successfully", sub });
  } catch (error) {
    return res.status(500).json({ error: "Something went wrong" });
  }
};

export const getSubHandler = async (_req: Request, _res: Response) => {};

export const getAllSubsHandler = async (_req: Request, _res: Response) => {};

export const editSubHandler = async (_req: Request, _res: Response) => {};

export const deleteSubHandler = async (_req: Request, _res: Response) => {};

export default {
  createSubHandler,
  getSubHandler,
  getAllSubsHandler,
  editSubHandler,
  deleteSubHandler,
};
