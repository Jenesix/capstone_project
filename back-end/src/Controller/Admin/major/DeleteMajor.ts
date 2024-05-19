import { Request, Response } from "express";
import { MajorModel } from "../../../Model/Schema";

export const DeleteMajor = async (req: Request, res: Response) => {
    try {
        const { majorID } = req.params;
        const result = await MajorModel.findByIdAndDelete(majorID);
        if (!result) {
            return res.status(400).json({ message: "Major not found" });
        }
        return res.status(200).json({ message: "Delete major success" });
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
};
