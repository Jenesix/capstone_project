import { Request, Response } from "express";
import { ClassModel, UserModel } from "../../../Model/Schema";

export const deleteUserClass = async (req: Request, res: Response) => {
    try {
        const { classID, userID } = req.params;

        const Class = await ClassModel.findById(classID);
        if (!Class) {
            return res.status(404).json({ message: 'Class not found' });
        }

        await ClassModel.findByIdAndUpdate(classID, { $pull: { UserID: userID } }, { new: true });
        await UserModel.findByIdAndUpdate(userID, { $pull: { ClassID: classID } }, { new: true });
        
        return res.status(200).json({ message: "Delete user from class success" });
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
};
