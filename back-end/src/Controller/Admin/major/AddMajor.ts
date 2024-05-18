import { Request, Response } from "express";
import { MajorModel } from "../../../Model/Schema";

export const AddMajor = async (req: Request, res: Response) => {
    try {
        const { major_name } = req.body;
        const major = new MajorModel({
            major_name
        });
        await major.save();
        return res.status(200).json({ message: "Add major success", major });
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
};
