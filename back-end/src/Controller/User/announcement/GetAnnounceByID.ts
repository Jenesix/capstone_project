import { Request, Response } from "express";
import { AnnouncementModel } from "../../../Model/Schema";

export const GetAnnounceByID = async (req: Request, res: Response) => {
    try {
        const { announceID } = req.params;
        const announcement = await AnnouncementModel.findById(announceID);
        if (!announcement) {
            return res.status(400).json({ message: "Announcement not found" });
        }
        return res.status(200).json(announcement);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
};
