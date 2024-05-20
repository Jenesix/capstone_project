import { Request, Response } from "express";
import { AttendanceModel } from "../../../Model/Schema";

export const EditAttend = async (req: Request, res: Response) => {
    try {
        const { attendID } = req.params;
        const updateFields = req.body;

        const result = await AttendanceModel.findByIdAndUpdate(attendID, updateFields, { new: true });
        if (!result) {
            return res.status(400).json({ message: "Attendance not found" });
        }

        return res.status(200).json({ message: "Edit attendance success", result });
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
};
