import { Request, Response } from "express";
import { ClassModel } from "../../../Model/Schema";

export const GetClassByID = async (req: Request, res: Response) => {
    try {
        const { classID } = req.params;
        const classes = await ClassModel.findById(classID);
        if (!classes) {
            return res.status(400).json({ message: "Class not found" });
        }
        return res.status(200).json(classes);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
};
