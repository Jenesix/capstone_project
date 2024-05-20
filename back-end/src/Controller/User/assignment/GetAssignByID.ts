import { Request, Response } from "express";
import { AssignmentModel, ClassModel } from "../../../Model/Schema";

export const GetAssignByID = async (req: Request, res: Response) => {
    try {
        const { assignID } = req.params;

        const assignment = await AssignmentModel.findById(assignID)
            .populate({ 
                path: "TurninID", 
                populate: { path: "UserID" } 
            });

        if (!assignment) {
            return res.status(400).json({ message: "Assignment not found" });
        }

        return res.status(200).json(assignment);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
};
