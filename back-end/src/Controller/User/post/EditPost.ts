import { Request, Response } from "express";
import { PostModel } from "../../../Model/Schema";
import { uploadImagePost } from "../../../utils/UploadFile";

export const EditPost = async (req: Request, res: Response) => {
    try {
        const { postID } = req.params;
        const updateFields = req.body;
        const files = req.files as Express.Multer.File[] | undefined;
        
        if (updateFields.removeImage === 'true') {
            updateFields.post_image = "";
        } else if (files && files.length > 0) {
            const fileUrl = await uploadImagePost(files[0]);
            updateFields.post_image = fileUrl;
        }

        const result = await PostModel.findByIdAndUpdate(postID, updateFields, { new: true });
        if (!result) {
            return res.status(404).json({ message: "Post not found" });
        }

        return res.status(200).json({ message: "Edit post success", result });
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
};
