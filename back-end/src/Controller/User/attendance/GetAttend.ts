import { Request, Response } from "express";
import { AttendanceModel, ClassModel } from "../../../Model/Schema";

export const GetAttend = async (req: Request, res: Response) => {
    try {
        const { classID } = req.params;

        const findClass = await ClassModel.findById(classID);
        if (!findClass) {
            return res.status(404).json({ message: "Class not found" });
        }

        const attend = await AttendanceModel.find({ ClassID: classID })
            .populate({
                path: "CheckID",
                // populate: { path: "UserID" }
            });

        return res.status(200).json(attend);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
};
