import { Request, Response } from "express";
import { UserModel, ClassModel } from "../../Model/Schema";

export const GetUserClass = async (req: Request, res: Response) => {
    try {
        const { classID } = req.params;

        const Class = await ClassModel.findById(classID);
        if (!Class) {
            return res.status(404).json({ message: 'Class not found' });
        }

        const user = await UserModel.find({ _id: { $in: Class.UserID } });

        res.status(200).json(user);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
};
