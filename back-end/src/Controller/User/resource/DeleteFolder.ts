import { Request, Response } from "express";
import { ResourceModel, ResourceFolderModel } from "../../../Model/Schema";

export const DeleteFolder = async (req: Request, res: Response) => {
    try {
        const { folderID } = req.params;

        const folder = await ResourceFolderModel.findById(folderID);
        if (!folder) {
            return res.status(400).json({ message: "Folder not found" });
        }

        await ResourceModel.deleteMany({ _id: { $in: folder.ResourceID } });
        await folder.deleteOne();

        return res.status(200).json({ message: "Delete folder success" });
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
};
