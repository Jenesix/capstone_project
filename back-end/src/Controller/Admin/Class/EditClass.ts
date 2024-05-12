import { Request, Response } from "express";
import { ClassModel } from "../../../Model/Schema";

export const EditClass = async (req: Request, res: Response) => {
    try {
        const { classID } = req.params;
        const updateFields = req.body;
        const result = await ClassModel.findByIdAndUpdate(classID, updateFields, { new: true });
        if (!result) {
            return res.status(400).json({ message: "Class not found" });
        }
        res.status(200).json({
            message: "Update class success",
            class: result,
        });
    } catch (error) {
        console.log(error);
    }
};
