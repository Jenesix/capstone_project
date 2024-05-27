import { Request, Response } from "express";
import { AssignmentTurninModel } from "../../../Model/Schema";

export const DeleteTurnin = async (req: Request, res: Response) => {
    try {
        const { turninID } = req.params;
        const result = await AssignmentTurninModel.findByIdAndDelete(turninID);
        if (!result) {
            return res.status(400).json({ message: "Turnin not found" });
        }
        return res.status(200).json({ message: "Delete turnin success" });
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
};
