import { Request, Response } from "express";
import { AttendanceModel, AttendanceCheckModel } from "../../../Model/Schema";
import jwt from "jsonwebtoken";
import { secret_jwt } from "../../../config/config";

export const CreateAttendCheck = async (req: Request, res: Response) => {
    try {
        const { attendID } = req.params;

        const token = req.cookies.token;
        const validToken = jwt.verify(token, String(secret_jwt));
        if (!validToken) {
            return res.status(400).json({ message: "Invalid token" });
        }
        const UserID = (validToken as { UserID: any }).UserID;

        const findAttend = await AttendanceModel.findById(attendID).select("time_start");
        if (!findAttend) {
            return res.status(404).json({ message: "Attendance not found" });
        }

        const time_start = findAttend.time_start;
        let status = "";

        const [hour, minute] = time_start.split(':').map(Number);
        const now = new Date();
        const start = new Date(now);
        start.setHours(hour, minute, 0, 0);
        const late = new Date(start);
        late.setMinutes(start.getMinutes() + 15);
        const absent = new Date(start);
        absent.setMinutes(start.getMinutes() + 30);

        if (now >= start && now <= late) {
            status = "On time";
        } else if (now > late && now <= absent) {
            status = "Late";
        } else if (now > absent) {
            status = "Absent";
        }

        const attendCheck = new AttendanceCheckModel({
            time_check: new Date(),
            status_atd: status,
            AttendanceID: attendID,
            UserID,
        });
        await attendCheck.save();

        await findAttend.updateOne({ $addToSet: { CheckID: attendCheck._id } });

        return res.status(200).json({ message: "Create attendance checked success", attendCheck });
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
};
