import { Request, Response } from "express";
import { AssignmentTurninModel } from "../../../Model/Schema";

export const GetTurninByID = async (req: Request, res: Response) => {
    try {
        const { turninID } = req.params;

        const findTurnin = await AssignmentTurninModel.findById(turninID)
            .populate("UserID");
        if (!findTurnin) {
            return res.status(400).json({ message: "Turnin not found" });
        }

        return res.status(200).json(findTurnin);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
};
