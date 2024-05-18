import { Request, Response } from "express";
import { ClassModel } from "../../../Model/Schema";

export const CreateClass = async (req: Request, res: Response) => {
    try {
        const {
            class_name,
            class_code,
            section,
            semester,
            year,
        } = req.body;

        const Class = new ClassModel({
            class_name,
            class_code,
            section,
            semester,
            year,
        });
        await Class.save();
        
        return res.status(200).json({ message: "Create class success" });
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
};
