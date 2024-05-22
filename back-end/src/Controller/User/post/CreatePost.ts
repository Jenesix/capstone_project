import { Request, Response } from "express";
import { PostModel } from "../../../Model/Schema";
import jwt from "jsonwebtoken";
import { secret_jwt } from "../../../config/config";
import { uploadImagePost } from "../../../utils/UploadFile";

export const CreatePost = async (req: Request, res: Response) => {
    try {
        const { classID } = req.params;
        const { title_p, description_p } = req.body;
        const files = req.files as Express.Multer.File[];

        const token = req.cookies.token;
        const validToken = jwt.verify(token, String(secret_jwt));
        if (!validToken) {
            return res.status(400).json({ message: "Invalid token" });
        }
        const UserID = (validToken as { UserID: any }).UserID;

        let imageUrl = "";
        if (files) {
            imageUrl = await uploadImagePost(files[0]);
        }
        
        const post = new PostModel({
            title_p,   
            description_p,
            UserID,
            ClassID: classID,
            post_image: imageUrl,
            time_p: new Date(),
        });
        await post.save();
        
        return res.status(200).send({ message: "Create post success", post });
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
};
