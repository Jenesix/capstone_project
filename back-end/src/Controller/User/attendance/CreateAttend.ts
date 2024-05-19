import { Request, Response } from "express";
import { ClassModel, AttendanceModel } from "../../../Model/Schema";

export const CreateAttend = async (req: Request, res: Response) => {
    try {
        const { classID } = req.params;
        const { date_atd, time_start } = req.body;

        const findClass = await ClassModel.findById(classID);
        if (!findClass) {
            return res.status(404).json({ message: "Class not found" });
        }

        const attendance = new AttendanceModel({
            date_atd,
            time_start,
            ClassID: classID,
        });
        await attendance.save();

        return res.status(200).json({ message: "Create attendance success", attendance });
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
};
