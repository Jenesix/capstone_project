import { Request, Response } from "express";
import { ClassModel, SyllabusModel } from "../../../../Model/Schema";
import { uploadSyllabus } from "../../../../utils/UploadFile";

export const UploadSyllabus = async (req: Request, res: Response) => {
    try {
        const { classID } = req.params;
        const file = req.file;

        const findClass = await ClassModel.findById(classID);
        if (!findClass) {
            return res.status(400).json({ message: "Class not found" });
        }

        // let fileUrl = "";
        // if (file) {
        //     fileUrl = await uploadSyllabus(file);
        // }

        if (!file) {
            return res.status(400).json({ message: "Please upload a file" });
        }
        const fileUrl = await uploadSyllabus(file);

        const syllabus = new SyllabusModel({
            file_syl: fileUrl,
            ClassID: classID
        });
        await syllabus.save();

        return res.status(200).json(syllabus);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
};
