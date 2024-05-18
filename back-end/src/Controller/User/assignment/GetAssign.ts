import { Request, Response } from "express";
import { AssignmentModel, ClassModel } from "../../../Model/Schema";

export const GetAssign = async (req: Request, res: Response) => {
    try {
        const { classID } = req.params;

        const findClass = await ClassModel.findById(classID);
        if (!findClass) {
            return res.status(400).json({ message: "Class not found" });
        }

        const result = await AssignmentModel.find({ ClassID: classID });
        return res.status(200).json(result);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
};
