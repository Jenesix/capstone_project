import { Request, Response } from "express";
import { CommentModel, PostModel } from "../../../Model/Schema";
import jwt from "jsonwebtoken";
import { secret_jwt } from "../../../config/config";

export const CreateComment = async (req: Request, res: Response) => {
    try {
        const { comment, postID } = req.body;

        const token = req.cookies.token;
        const validToken = jwt.verify(token, String(secret_jwt));
        if (!validToken) {
            return res.status(400).json({ message: "Invalid token" });
        }
        const UserID = (validToken as { UserID: any }).UserID;

        const findPost = await PostModel.findById(postID);
        if (!findPost) {
            return res.status(404).json({ message: "Post not found" });
        }

        const newComment = new CommentModel({
            comment,
            time_cm: new Date(),
            UserID,
            PostID: postID
        });
        await newComment.save();

        await findPost.updateOne({ $addToSet: { CommentID: newComment._id } });

        return res.status(200).send({ message: "Create comment success", newComment });
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
};
