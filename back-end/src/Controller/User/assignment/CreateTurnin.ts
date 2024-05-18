import { Request, Response } from "express";
import { AssignmentModel, AssignmentTurninModel } from "../../../Model/Schema";
import { uploadAssignmentFile } from "../../../utils/UploadFile";
import jwt from "jsonwebtoken";
import { secret_jwt } from "../../../config/config";

export const CreateTurnin = async (req: Request, res: Response) => {
    try {
        const { assignID } = req.params;
        const {
            status_turnin,
            score
        } = req.body;
        const file = req.file;

        const token = req.cookies.token;
        const validToken = jwt.verify(token, String(secret_jwt));
        if (!validToken) {
            return res.status(400).json({ message: "Invalid token" });
        }
        const UserID = (validToken as { UserID: any }).UserID;

        const findAssign = await AssignmentModel.findById(assignID);
        if (!findAssign) {
            return res.status(400).json({ message: "Assignment not found" });
        }

        let fileUrl = "";
        if (file) {
            fileUrl = await uploadAssignmentFile(file);
        }

        const turnin = new AssignmentTurninModel({
            status_turnin,
            score: score || 0,
            file_turnin: fileUrl,
            AssignmentID: assignID,
            UserID
        });
        await turnin.save();

        return res.status(200).json({ message: "Create turnin success", turnin });
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
};
