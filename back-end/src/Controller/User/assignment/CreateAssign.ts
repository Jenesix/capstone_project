import { Request, Response } from "express";
import { AssignmentModel, ClassModel } from "../../../Model/Schema";
import { uploadAssignmentFile } from "../../../utils/UploadFile";

export const CreateAssign = async (req: Request, res: Response) => {
    try {
        const { classID } = req.params;
        const {
            assignment_name,
            description_asm,
            date,
            time,
            fullscore,
        } = req.body;
        const file = req.file;

        const findClass = await ClassModel.findById(classID);
        if (!findClass) {
            return res.status(400).json({ message: "Class not found" });
        }

        const due_date = `${date}T${time}`;

        let fileUrl = "";
        if (file) {
            fileUrl = await uploadAssignmentFile(file);
        }

        const assignment = new AssignmentModel({
            assignment_name,
            description_asm,
            due_date,
            fullscore,
            file_asm: fileUrl,
            ClassID: classID,
        });
        await assignment.save();

        return res.status(200).send({ message: "Create assignment success", assignment });
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
};
