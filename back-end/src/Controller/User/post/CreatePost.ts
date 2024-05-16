import { Request, Response } from "express";
import { PostModel } from "../../../Model/Schema";
import jwt from "jsonwebtoken";
import { secret_jwt } from "../../../config/config";
import { uploadImagePost } from "../../../utils/UploadFile";

export const CreatePost = async (req: Request, res: Response) => {
    try {
        const { classID } = req.params;
        const { title_p, description_p } = req.body;
        const file = req.file;

        const token = req.cookies.token;
        const validToken = jwt.verify(token, String(secret_jwt));
        if (!validToken) {
            return res.status(400).json({ message: "Invalid token" });
        }
        const UserID = (validToken as { UserID: any }).UserID;

        let imageUrl = "";
        if (file) {
            imageUrl = await uploadImagePost(file);
        }
        
        const post = new PostModel({
            title_p,   
            description_p,
            UserID,
            ClassID: classID,
            post_image: imageUrl,
        });
        await post.save();
        res.status(201).send("Post created successfully!");
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
};
