import { Request, Response } from "express";
import { AttendanceCheckModel } from "../../../Model/Schema";

export const GetAttendCheckUser = async (req: Request, res: Response) => {
    try {
        const { userID } = req.params;
        
        const result = await AttendanceCheckModel.find({ UserID: userID });
        if (!result) {
            return res.status(400).json({ message: "Attendance checked not found" });
        }

        return res.status(200).json(result);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
};
