import { Request, Response } from "express";
import { AnnouncementModel, ClassModel } from "../../../Model/Schema";
import jwt from "jsonwebtoken";
import { secret_jwt } from "../../../config/config";

export const CreateAnnounce = async (req: Request, res: Response) => {
    try {
        const { classID } = req.params;
        const {
            title_anm,
            desc_anm,
        } = req.body;

        const token = req.cookies.token;
        const validToken = jwt.verify(token, String(secret_jwt));
        if (!validToken) {
            return res.status(400).json({ message: "Invalid token" });
        }
        const UserID = (validToken as { UserID: any }).UserID;

        const announcement = new AnnouncementModel({
            title_anm,
            desc_anm,
            time_anm: new Date(),
            ClassID: classID,
            UserID,
        });
        await announcement.save();

        const ref = await ClassModel.findByIdAndUpdate(classID, { $addToSet: { AnnouncementID: announcement._id } }, { new: true });
        if (!ref) {
            return res.status(400).json({ message: "Class not found" });
        }
        
        return res.status(200).json({ message: "Create announcement success" });
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
};