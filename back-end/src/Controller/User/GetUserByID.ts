import { Request, Response } from "express";
import { UserModel } from "../../Model/Schema";
import jwt from "jsonwebtoken";
import { secret_jwt } from "../../config/config";

export const GetUserByID = async (req: Request, res: Response) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            res.json({ message: "Unauthorized" });
            return false;
        }
        const validToken = jwt.verify(token, String(secret_jwt));
        if (!validToken) {
            res.json({ message: "Invalid token" });
            return false;
        }
        const UserID = (validToken as { UserID: any }).UserID;

        const user = await UserModel.findById(UserID);
        if (!user) {
            res.json({ message: "User not found" });
            return false;
        }
        res.status(200).json(user);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
};
