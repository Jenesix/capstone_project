import { Request, Response } from "express";
import { PostModel, CommentModel } from "../../../Model/Schema";

export const DeleletPost = async (req: Request, res: Response) => {
    try {
        const { postID } = req.params;

        const post = await PostModel.findById(postID);
        if (!post) {
            return res.status(400).json({ message: "Post not found" });
        }

        await CommentModel.deleteMany({ _id: { $in: post.CommentID } });
        await post.deleteOne();

        return res.status(200).json({ message: "Delete post success" });
    } catch (error: any) {
        console.log(error.message);
    }
};
