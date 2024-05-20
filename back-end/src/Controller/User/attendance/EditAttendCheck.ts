import { Request, Response } from "express";
import { AttendanceCheckModel } from "../../../Model/Schema";

export const EditAttendCheck = async (req: Request, res: Response) => {
    try {
        const { checkID } = req.params;
        const { status_atd } = req.body;

        const result = await AttendanceCheckModel.findByIdAndUpdate(checkID, { status_atd }, { new: true });
        if (!result) {
            return res.status(400).json({ message: "Attendance checked not found" });
        }

        return res.status(200).json({ message: "Edit attendance checked success", result });
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
};
