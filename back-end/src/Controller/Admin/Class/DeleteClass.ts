import { Request, Response } from "express";
import { ClassModel } from "../../../Model/Schema";

export const DeleteClass = async (req: Request, res: Response) => {
    try {
        const { classID } = req.params;
        const result = await ClassModel.findByIdAndDelete(classID);
        if (!result) {
            return res.status(400).json({ message: "Class not found" });
        }
        res.status(200).json({ message: "Delete class success" });
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
};
