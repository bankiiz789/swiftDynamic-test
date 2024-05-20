import {
  createUserService,
  getUsers,
  deleteUser,
  editUser,
} from "../service/user-service";
import { Request, Response, NextFunction } from "express";

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const newUser = await createUserService(req.body);

    res.status(200).json(newUser);
  } catch (error) {
    console.log(error);
  }
};

export const fetchUsers = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const pageSize = 10;
    const data = await getUsers(page, pageSize);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const deleteUserController = async (req: Request, res: Response) => {
  try {
    const { id } = req.body;
    await deleteUser(id);
    res.status(201).json({ massage: "delete success" });
  } catch (error) {
    console.log(error);
  }
};

export const editUserController = async (req: Request, res: Response) => {
  try {
    const { id } = req.body;
    const data = req.body;
    const response = await editUser(data, id);
    res.status(200).json({ response });
  } catch (err) {
    console.log(err);
  }
};
