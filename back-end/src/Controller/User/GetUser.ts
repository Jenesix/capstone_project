import { Request, Response } from "express";
import { UserModel } from "../../Model/Schema";

export const GetUser = async (req: Request, res: Response) => {
    try {
        const users = await UserModel.find({});
        return res.status(200).json(users);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
};
