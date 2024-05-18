import { Request, Response } from "express";
import { UserModel } from "../../Model/Schema";

export const UpdateUser = async (req: Request, res: Response) => {
    try {
        const { userID } = req.params;
        const updateFields = req.body;
        const result = await UserModel.findByIdAndUpdate(userID, updateFields, { new: true });
        if (!result) {
            return res.status(400).json({ message: "User not found" });
        }

        return res.status(200).json({ message: "Update user success", result });
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
};
