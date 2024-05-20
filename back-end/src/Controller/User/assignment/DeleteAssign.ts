import { Request, Response } from "express";
import { AssignmentModel } from "../../../Model/Schema";

export const DeleteAssign = async (req: Request, res: Response) => {
    try {
        const { assignID } = req.params;
        const result = await AssignmentModel.findByIdAndDelete(assignID);
        if (!result) {
            return res.status(400).json({ message: "Assignment not found" });
        }
        return res.status(200).json({ message: "Delete assignment success" });
    } catch (error) {
        console.log(error);
        res.status(500).json(error);      
    }
};
