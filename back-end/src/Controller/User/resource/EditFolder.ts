import { Request, Response } from "express";
import { ResourceFolderModel } from "../../../Model/Schema";

export const EditFolder = async (req: Request, res: Response) => {
    try {
        const { folderID } = req.params;
        const { folder_name } = req.body;

        const result = await ResourceFolderModel.findByIdAndUpdate(folderID, { folder_name }, { new: true });
        if (!result) {
            return res.status(400).json({ message: "Folder not found" });
        }
        await result.save();

        return res.status(200).json({ message: "Edit folder success", result });
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
};
