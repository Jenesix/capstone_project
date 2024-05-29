import { Request, Response } from "express";
import { AssignmentTurninModel, AssignmentModel } from '../../../Model/Schema';
import { uploadTurninFile } from "../../../utils/UploadFile";

export const EditTurnin = async (req: Request, res: Response) => {
    try {
        const { turninID } = req.params;
        const updateFields = req.body;
        const files = req.files as Express.Multer.File[];

        if (files) {
            const assignment = await AssignmentTurninModel.findById(turninID).select("file_turnin");
            const currentFiles = assignment?.file_turnin || [];
            for (const file of files) {
                const url = await uploadTurninFile(file);
                currentFiles.push(url);
            }
            updateFields.file_turnin = currentFiles;
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
