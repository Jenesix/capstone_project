import { Request, Response } from "express";
import { AttendanceCheckModel, AttendanceModel } from "../../../Model/Schema";

export const GetAttendCheck = async (req: Request, res: Response) => {
    try {
        const { attendID } = req.params;
        const attend = await AttendanceModel.findById(attendID);
        if (!attend) {
            return res.status(400).json({ message: "Attendance not found" });
        }
        const checked = await AttendanceCheckModel.find({ AttendanceID: attendID });
        return res.status(200).json(checked);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
};
