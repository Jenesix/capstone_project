import { Request, Response } from "express";
import { FacultyModel } from "../../../Model/Schema";

export const DeleteFaculty = async (req: Request, res: Response) => {
    try {
        const { facultyID } = req.params;
        const result = await FacultyModel.findByIdAndDelete(facultyID);
        if (!result) {
            return res.status(400).json({ message: "Faculty not found" });
        }
        return res.status(200).json({ message: "Delete faculty success" });
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
};
