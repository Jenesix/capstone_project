import { Request, Response } from "express";
import { PostModel, ClassModel } from "../../../Model/Schema";

export const GetPostByID = async (req: Request, res: Response) => {
    try {
        const { postID } = req.params;

        const post = await PostModel.findById(postID)
            .populate({ path: "UserID" })
            .populate({ path: "CommentID" });
            
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        return res.status(200).json(post);
    } catch (error: any) {
        console.log(error.message);
    }
};
