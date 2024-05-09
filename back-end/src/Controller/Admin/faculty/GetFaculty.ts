import { Request, Response } from "express";
import { FacultyModel } from "../../../Model/Schema";

export const GetFaculty = async (req: Request, res: Response) => {
    try {
        const faculty = await FacultyModel.find({});
        res.status(200).json(faculty);
    } catch (error) {
        console.log(error);
    }
};
