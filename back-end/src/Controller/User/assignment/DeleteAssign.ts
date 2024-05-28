import { Request, Response } from "express";
import { AssignmentModel, AssignmentTurninModel } from "../../../Model/Schema";

export const DeleteAssign = async (req: Request, res: Response) => {
    try {
        const { assignID } = req.params;

        const assign = await AssignmentModel.findById(assignID);
        if (!assign) {
            return res.status(400).json({ message: "Assignment not found" });
        }

        await AssignmentTurninModel.deleteMany({ _id: { $in: assign.TurninID } });
        await assign.deleteOne();

        return res.status(200).json({ message: "Delete assignment success" });
    } catch (error) {
        console.log(error);
        res.status(500).json(error);      
    }
};
