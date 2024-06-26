import { Request, Response } from "express";
import { ClassModel, UserModel } from '../../../Model/Schema';

export const addUserToClass = async (req: Request, res: Response) => {
    try {
        const { classID } = req.params;
        const { userIDs } = req.body; // array of userID

        const findClass = await ClassModel.findById(classID);
        if (!findClass) {
            return res.status(404).json({ message: 'Class not found' });
        }

        for (const userID of userIDs) {
            const user = await UserModel.findById(userID);
            if (!user) {
                return res.status(404).json({ message: `UserID ${userID} not found` });
            }
            await ClassModel.findByIdAndUpdate(classID, { $addToSet: { UserID: userID } }, { new: true });
            await UserModel.findByIdAndUpdate(userID, { $addToSet: { ClassID: classID } }, { new: true });
        }

        return res.status(200).json({ message: "Add user to class success" });
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
};
