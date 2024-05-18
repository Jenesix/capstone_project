import { Request, Response } from "express";
import { ResourceModel, ClassModel } from "../../../Model/Schema";
import { uploadFile } from "../../../utils/UploadFile";

export const UploadResource = async (req: Request, res: Response) => {
    try {
        const { classID } = req.params;
        const file = req.file;

        // let fileUrl = "";
        // if (file) {
        //     fileUrl = await uploadFile(file);
        // }

        if (!file) {
            return res.status(400).json({ message: "Please upload a file" });
        }
        const fileUrl = await uploadFile(file);

        const resource = new ResourceModel({
            file_rs: fileUrl,
            ClassID: classID,
        });
        await resource.save();

        return res.status(200).json({ message: "Upload resource success" });
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
};
