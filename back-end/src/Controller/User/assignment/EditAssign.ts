import { Request, Response } from "express";
import { AssignmentModel } from "../../../Model/Schema";
import { uploadAssignmentFile } from "../../../utils/UploadFile";

export const EditAssign = async (req: Request, res: Response) => {
    try {
        const { assignID } = req.params;
        const updateFields = req.body;
        const files = req.files as Express.Multer.File[];

        if (files) {
            const assignment = await AssignmentModel.findById(assignID).select("file_asm");
            const currentFiles = assignment?.file_asm || [];
            for (const file of files) {
                const url = await uploadAssignmentFile(file);
                currentFiles.push(url);
            }
            updateFields.file_asm = currentFiles;
        }

        const result = await AssignmentModel.findByIdAndUpdate(assignID, updateFields, { new: true });
        if (!result) {
            return res.status(400).json({ message: "Assignment not found" });
        }

        return res.status(200).json({ message: "Edit assignment success", result });
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
};
