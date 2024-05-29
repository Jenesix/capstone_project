import { Request, Response } from "express";
import { ResourceFolderModel, ClassModel } from "../../../Model/Schema";

export const CreateFolder = async (req: Request, res: Response) => {
    try {
        const { classID } = req.params;
        const { folder_name } = req.body;

        const findClass = await ClassModel.findById(classID);
        if (!findClass) {
            return res.status(400).json({ message: "Class not found" });
        }
        const folder = new ResourceFolderModel({
            folder_name,
            ClassID: classID,
        });
        await folder.save();

        return res.status(200).json({ message: "Create folder success", folder });
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
};
