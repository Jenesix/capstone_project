import { Request, Response } from "express";
import { MajorModel } from "../../../Model/Schema";

export const EditMajor = async (req: Request, res: Response) => {
    try {
        const {majorID} = req.params;
        const {major_name} = req.body;
        const result = await MajorModel.findByIdAndUpdate(majorID, {major_name: major_name});
        if (!result) {
            return res.status(400).json({ message: "Major not found" });
        }
        res.status(200).json({ message: "Edit major_name success" });
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}
