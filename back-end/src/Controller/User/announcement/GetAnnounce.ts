import { Request, Response } from "express";
import { AnnouncementModel } from "../../../Model/Schema";

export const GetAnnounce = async (req: Request, res: Response) => {
    try {
        const { classID } = req.params;
        if (!classID) {
            return res.status(400).json({ message: "Class not found" });
        }
        const announcement = await AnnouncementModel.find({ ClassID: classID })
            .populate({ path: "UserID" });

        return res.status(200).json(announcement);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
};
