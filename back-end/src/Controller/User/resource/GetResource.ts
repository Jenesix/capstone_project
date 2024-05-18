import { Request, Response } from "express";
import { ResourceModel, ClassModel } from "../../../Model/Schema";

export const GetResource = async (req: Request, res: Response) => {
    try {
        const { classID } = req.params;
        const Class = await ClassModel.findById(classID);
        if (!Class) {
            return res.status(400).json({ message: "Class not found" });
        }
        const result = await ResourceModel.find({ ClassID: classID });
        return res.status(200).json(result);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
};
