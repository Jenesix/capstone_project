import { Request, Response } from "express";
import { SyllabusModel } from "../../../../Model/Schema";

export const DeleteSyllabus = async (req: Request, res: Response) => {
    try {
        const { syllabusID } = req.params;
        const result = await SyllabusModel.findByIdAndDelete(syllabusID);
        if (!result) {
            return res.status(400).json({ message: "Syllabus not found" });
        }
        return res.status(200).json({ message: "Delete syllabus success" });
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
};
