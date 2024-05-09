import { Request, Response } from "express";
import { FacultyModel } from "../../../Model/Schema";

export const AddFaculty = async (req: Request, res: Response) => {
    try {
        const { faculty_name } = req.body;
        const faculty = new FacultyModel({
            faculty_name
        });
        await faculty.save();
        return res.status(200).json({ message: "Add faculty success" });
    } catch (error) {
        console.log(error);
    }
};
