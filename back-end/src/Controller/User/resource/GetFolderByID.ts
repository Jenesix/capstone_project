import { Request, Response } from "express";
import { ResourceFolderModel } from "../../../Model/Schema";

export const GetFolderByID = async (req: Request, res: Response) => {
    try {
        const { folderID } = req.params;

        const folder = await ResourceFolderModel.findById(folderID)
            .populate("ResourceID");

        if (!folder) {
            return res.status(400).json({ message: "Folder not found" });
        }
        
        return res.status(200).json(folder);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
};
