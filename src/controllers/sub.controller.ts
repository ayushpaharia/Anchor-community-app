import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Sub } from "../entities/Sub";
import User from "../entities/User";

export const createSubHandler = async (req: Request, res: Response) => {
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
    const sub = new Sub({ name, description, title, user });
    await sub.save();
    return res.json({ message: "Sub created successfully", sub });
  } catch (error ) {
    res.status(500).json({ message: "Something went wrong", error });
  }
};

export const getSubHandler = async (req: Request, res: Response) => {};

export const getAllSubsHandler = async (req: Request, res: Response) => {};

export const editSubHandler = async (req: Request, res: Response) => {};

export const deleteSubHandler = async (req: Request, res: Response) => {};

export default {
  createSubHandler,
  getSubHandler,
  getAllSubsHandler,
  editSubHandler,
  deleteSubHandler,
};
