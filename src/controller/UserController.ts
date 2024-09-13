import { UserModel } from "../model/UserModel";
import {Request, Response} from 'express'

const getUsers = async (req:Request, res:Response) => {
  try {
    const users = await UserModel.find();
    res.send(users);
  } catch (error) {
    res.status(400).json({ errorMessage: "Error happened" });
  }
};

const createUser = async (req:Request, res: Response) => {
  try {
    const { name, email } = req.body;

    const user = await UserModel.create({
      name,
      email,
    });

    res.send(user);
  } catch (error) {
    res.status(400).json({ errorMessage: "Error happened" });
  }
};

const updateUser = async (req:Request, res: Response) => {
  try {
    const { name, email } = req.body;
    const { id } = req.params;

    const user = await UserModel.findByIdAndUpdate(id, {
      name,
      email,
    });

    res.send(user);
  } catch (error) {
    res.status(400).json({ errorMessage: "Error happened" });
  }
};

const deleteUser = async (req:Request, res: Response) => {
  try {
    const { id } = req.params;
    await UserModel.deleteOne({ _id: id });

    res.send({ message: "Successfully deleted" });
  } catch (error) {
    res.status(400).json({ errorMessage: "Error happened" });
  }
};

export { getUsers, createUser, updateUser, deleteUser };
