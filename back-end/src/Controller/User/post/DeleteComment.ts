import { Request, Response } from "express";
import { PostModel, CommentModel } from "../../../Model/Schema";


export const DeleletComment = async (req: Request, res: Response) => {
    try {
        const { commentID } = req.params;

        const comment = await CommentModel.findById(commentID);
        if (!comment) {
            return res.status(404).json({ message: "Comment not found" });
        }

        await comment.deleteOne();
        await PostModel.updateOne({ CommentID: commentID }, { $pull: { CommentID: commentID } });

        return res.status(200).json({ message: "Delete comment success" });
    } catch (error: any) {
        console.log(error.message);
        res.status(500).json(error);
    }
};
