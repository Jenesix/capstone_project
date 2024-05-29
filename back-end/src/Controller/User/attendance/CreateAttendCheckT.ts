import { Request, Response } from "express";
import { AttendanceModel, AttendanceCheckModel } from "../../../Model/Schema";

export const CreateAttendCheckT = async (req: Request, res: Response) => {
    try {
        const { attendID, userID } = req.query;
        const { status } = req.body;

        const findAttend = await AttendanceModel.findById(attendID);
        if (!findAttend) {
            return res.status(404).json({ message: "Attendance not found" });
        }

        const attendCheck = new AttendanceCheckModel({
            UserID: userID,
            AttendanceID: attendID,
            time_check: new Date(),
            status_atd: status,
        });
        await attendCheck.save();

        await findAttend.updateOne({ $addToSet: { CheckID: attendCheck._id } });

        return res.status(200).json({ message: "Create attendance checked success", attendCheck });
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
};
