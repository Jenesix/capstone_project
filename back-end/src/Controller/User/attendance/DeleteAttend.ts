import { Request, Response } from "express";
import { AttendanceModel } from "../../../Model/Schema";

export const DeleteAttend = async (req: Request, res: Response) => {
    try {
        const { attendID } = req.params;
        const result = await AttendanceModel.findByIdAndDelete(attendID);
        if (!result) {
            return res.status(400).json({ message: "Attendance not found" });
        }
        return res.status(200).json({ message: "Delete attendance success" });
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
};
