import { Request, Response } from "express";
import { AttendanceCheckModel } from "../../../Model/Schema";

export const DeleteAttendCheck = async (req: Request, res: Response) => {
    try {
        const { checkID } = req.params;
        const result = await AttendanceCheckModel.findByIdAndDelete(checkID);
        if (!result) {
            return res.status(400).json({ message: "Attendance checked not found" });
        }
        return res.status(200).json({ message: "Delete attendance checked success" });
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
};
