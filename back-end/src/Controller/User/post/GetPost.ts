import { Request, Response } from "express";
import { PostModel, ClassModel } from "../../../Model/Schema";

export const GetPost = async (req: Request, res: Response) => {
    try {
        const { classID } = req.params;

        const Class = await ClassModel.findById(classID);
        if (!Class) {
            return res.status(404).json({ message: "Class not found" });
        }

        const posts = await PostModel.find({ ClassID: classID })
            .populate({ path: "UserID" })
            .populate({ path: "CommentID" });

        return res.status(200).json(posts);
    } catch (error: any) {
        console.log(error.message);
    }
};
