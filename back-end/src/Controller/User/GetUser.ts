import { Request, Response } from "express";
import { UserModel } from "../../Model/Schema";

export const GetUser = async (req: Request, res: Response) => {
    try {
        const users = await UserModel.find({});
        res.status(200).json(users);
    } catch (error) {
        console.log(error);
    }
};
