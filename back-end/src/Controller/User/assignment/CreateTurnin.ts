import { Request, Response } from "express";
import { AssignmentModel, AssignmentTurninModel } from '../../../Model/Schema';
import { uploadAssignmentFile } from "../../../utils/UploadFile";
import jwt from "jsonwebtoken";
import { secret_jwt } from "../../../config/config";

export const CreateTurnin = async (req: Request, res: Response) => {
    try {
        const { assignID } = req.params;
        const file = req.file;

        const token = req.cookies.token;
        const validToken = jwt.verify(token, String(secret_jwt));
        if (!validToken) {
            return res.status(400).json({ message: "Invalid token" });
        }
        const UserID = (validToken as { UserID: any }).UserID;

        const findAssign = await AssignmentModel.findById(assignID).select("due_date");
        if (!findAssign) {
            return res.status(400).json({ message: "Assignment not found" });
        }
        const due_date = findAssign.due_date
        const status = new Date() < new Date(due_date) ? "Submitted" : "Late Submitted";

        let fileUrl = "";
        if (file) {
            fileUrl = await uploadAssignmentFile(file);
        }

        const turnin = new AssignmentTurninModel({
            status_turnin: status,
            score: 0,
            file_turnin: fileUrl,
            AssignmentID: assignID,
            UserID
        });
        await turnin.save();

        return res.status(200).json({ message: "Turn in assignment success", turnin });
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
};