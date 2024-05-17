import { Request, Response } from "express";
import { AnnouncementModel } from "../../../Model/Schema";

export const DeleteAnnounce = async (req: Request, res: Response) => {
    try {
        const { announceID } = req.params;
        const result = await AnnouncementModel.findByIdAndDelete(announceID);
        if (!result) {
            return res.status(400).json({ message: "Announcement not found" });
        }
        res.status(200).json({ message: "Delete announcement success" });
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
};
