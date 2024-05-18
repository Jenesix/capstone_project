import { Request, Response } from "express";
import { AssignmentTurninModel, AssignmentModel } from '../../../Model/Schema';
import { uploadAssignmentFile } from "../../../utils/UploadFile";

export const EditTurnin = async (req: Request, res: Response) => {
    try {
        const { assignID , turninID } = req.params;
        const updateFields = req.body;
        const file = req.file;

        if (file) {
            const fileUrl = await uploadAssignmentFile(file);
            updateFields.file_turnin = fileUrl;
        }

        const findAssign = await AssignmentModel.findById(assignID).select("fullscore");
        if (!findAssign) {
            return res.status(400).json({ message: "Assignment not found" });
        }
        const fullscore = findAssign.fullscore;
        if (updateFields.score > fullscore) {
            return res.status(400).json({ message: "Score can't be greater than fullscore" });
        }

        const result = await AssignmentTurninModel.findByIdAndUpdate(turninID, updateFields, { new: true });
        if (!result) {
            return res.status(400).json({ message: "Assignment(turned in) not found" });
        }

        return res.status(200).json({ message: "Edit assignment(turned in) success", result });
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
};
