import { Request, Response } from "express";
import { UserModel, ClassModel } from "../../Model/Schema";

export const GetEnrollment = async (req: Request, res: Response) => {
    try {
        const { userID } = req.params;
        const user = await UserModel.findById(userID);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const classes = await ClassModel.find({ _id: { $in: user.ClassID } });
        return res.status(200).json({ classes });
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
};
