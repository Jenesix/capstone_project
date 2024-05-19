import { Request, Response } from "express";
import { AssignmentModel, AssignmentTurninModel, ClassModel } from "../../../Model/Schema";

export const GetTurnin = async (req: Request, res: Response) => {
    try {
        const { assignID } = req.params;

        const findAssign = await AssignmentModel.findById(assignID);
        if (!findAssign) {
            return res.status(400).json({ message: "Assignment not found" });
        }

        const findTurnin = await AssignmentTurninModel.find({ AssignmentID: assignID });
   
        return res.status(200).json(findTurnin);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
};
