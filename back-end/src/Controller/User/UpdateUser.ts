import { Request, Response } from "express";
import { UserModel } from "../../Model/Schema";

export const UpdateUser = async (req: Request, res: Response) => {
    try {
        const { UserID } = req.params;
        const updateFields = req.body;
        const result = await UserModel.findByIdAndUpdate(UserID, updateFields, { new: true });
        if (!result) {
            return res.status(400).json({ message: "User not found" });
        }
        res.status(200).json({
            message: "Update user success",
            user: result
        });
    } catch (error) {
        console.log(error);
    }
};
