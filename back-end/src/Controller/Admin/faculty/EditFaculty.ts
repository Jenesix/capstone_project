import { Request, Response } from "express";
import { FacultyModel } from "../../../Model/Schema";

export const EditFaculty = async (req: Request, res: Response) => {
    try {
        const { facultyID } = req.params;
        const { faculty_name } = req.body;
        const result = await FacultyModel.findByIdAndUpdate(facultyID, { faculty_name: faculty_name });
        if (!result) {
            return res.status(400).json({ message: "Faculty not found" });
        }
        res.status(200).json({ message: "Edit faculty_name success" });
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
};
