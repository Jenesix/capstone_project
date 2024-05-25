import { Request, Response } from "express";
import { AssignmentTurninModel } from "../../../Model/Schema";

export const DeleteFileTurnin = async (req: Request, res: Response) => {
    try {
        const { turninID } = req.params;
        const { file_delete } = req.body;

        const turnin = await AssignmentTurninModel.findById(turninID).select("file_turnin");
        if (!turnin) {
            return res.status(400).json({ message: "Assignment(turned in) not found" });
        }
        turnin.file_turnin = turnin.file_turnin.filter((url) => !url.includes(file_delete));
        await turnin.save();

        return res.status(200).json({ message: "Delete file in assignment(turned in) success", turnin });
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
};
