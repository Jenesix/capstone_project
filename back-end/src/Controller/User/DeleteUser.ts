import { Request, Response } from "express";
import { UserModel } from "../../Model/Schema";

export const DeleteUser = async (req: Request, res: Response) => {
    try {
        const { userID } = req.params;
        const result = await UserModel.findByIdAndDelete(userID);
        if (!result) {
            return res.status(400).json({ message: "User not found" });
        }
        return res.status(200).json({ message: "Delete user success" });
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}
