import { Request, Response } from "express";
import { PostModel, ClassModel } from "../../../Model/Schema";

export const GetPost = async (req: Request, res: Response) => {
    try {
        const { classID } = req.params;

        const findClass = await ClassModel.findById(classID);
        if (!findClass) {
            return res.status(400).json({ message: "Class not found" });
        }

        const post = await PostModel.find({ ClassID: classID })
            .populate({ path: "UserID" })
            .populate({ path: "CommentID" });

        return res.status(200).json(post);
    } catch (error: any) {
        console.log(error.message);
    }
};
