import { Request, Response } from "express";
import { AnnouncementModel } from "../../../Model/Schema";

export const EditAnnounce = async (req: Request, res: Response) => {
    try {
        const { announceID } = req.params;
        const updateFields = req.body;

        const result = await AnnouncementModel.findByIdAndUpdate(announceID, updateFields, { new: true });
        if (!result) {
            return res.status(400).json({ message: "Announcement not found" });
        }
        
        return res.status(200).json({ message: "Edit announcement success", result });
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
};
