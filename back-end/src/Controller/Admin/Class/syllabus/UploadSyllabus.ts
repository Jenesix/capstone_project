import { Request, Response } from "express";
import { ClassModel, SyllabusModel } from "../../../../Model/Schema";
import { uploadSyllabus } from "../../../../utils/UploadFile";

export const UploadSyllabus = async (req: Request, res: Response) => {
    try {
        const { classID } = req.params;
        const files = req.files as Express.Multer.File[];

        const findClass = await ClassModel.findById(classID);
        if (!findClass) {
            return res.status(400).json({ message: "Class not found" });
        }

        // let fileUrl = "";
        // if (file) {
        //     fileUrl = await uploadSyllabus(file);
        // }

        if (!files) {
            return res.status(400).json({ message: "Please upload a file" });
        }
        const fileUrl = await uploadSyllabus(files[0]);

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
