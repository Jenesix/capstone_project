import { Request, Response } from "express";
import { ResourceFolderModel } from "../../../Model/Schema";

export const DeleteFolder = async (req: Request, res: Response) => {
    try {
        const { folderID } = req.params;
        const result = await ResourceFolderModel.findByIdAndDelete(folderID);
        if (!result) {
            return res.status(400).json({ message: "Folder not found" });
        }
        return res.status(200).json({ message: "Delete folder success" });
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
};
