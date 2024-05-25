import { Request, Response } from "express";
import { AssignmentModel } from "../../../Model/Schema";

export const DeleteFileAssign = async (req: Request, res: Response) => {
    try {
        const { assignID } = req.params;
        const { file_delete } = req.body;

        const assignment = await AssignmentModel.findById(assignID).select("file_asm");
        if (!assignment) {
            return res.status(400).json({ message: "Assignment not found" });
        }
        assignment.file_asm = assignment.file_asm.filter((url) => !url.includes(file_delete));
        await assignment.save();

        return res.status(200).json({ message: "Delete file in assignment success", assignment });
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
};
