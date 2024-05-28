import { Request, Response } from "express";
import { AttendanceModel, AttendanceCheckModel } from "../../../Model/Schema";

export const DeleteAttend = async (req: Request, res: Response) => {
    try {
        const { attendID } = req.params;
        
        const attend = await AttendanceModel.findById(attendID);
        if (!attend) {
            return res.status(400).json({ message: "Attendance not found" });
        }

        await AttendanceCheckModel.deleteMany({ _id: { $in: attend.CheckID } });
        await attend.deleteOne();

        return res.status(200).json({ message: "Delete attendance success" });
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
};
