import { Request, Response } from "express";
import { ResourceModel, ClassModel, ResourceFolderModel } from "../../../Model/Schema";
import { uploadResourceFile } from "../../../utils/UploadFile";

export const UploadResource = async (req: Request, res: Response) => {
    try {
        const { classID, folderID } = req.query;
        const file = req.file;

        // let fileUrl = "";
        // if (file) {
        //     fileUrl = await uploadFile(file);
        // }

        const findClass = await ClassModel.findById(classID);
        if (!findClass) {
            return res.status(400).json({ message: "Class not found" });
        }

        if (!file) {
            return res.status(400).json({ message: "Please upload a file" });
        }
        const fileUrl = await uploadResourceFile(file);

        if (!folderID) {
            const resource = new ResourceModel({
                file_rs: fileUrl,
                ClassID: classID,
            });
            await resource.save();
            return res.status(200).json({ message: "Upload resource success", resource });
        } else {
            const resource = new ResourceModel({
                file_rs: fileUrl,
                ClassID: classID,
                ResourceFolderID: folderID
            });
            await resource.save();
            return res.status(200).json({ message: "Upload resource success", resource });
        }  
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
};
