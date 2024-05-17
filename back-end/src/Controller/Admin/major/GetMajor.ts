import { Request, Response } from "express";
import { MajorModel } from "../../../Model/Schema";

export const GetMajor = async (req: Request, res: Response) => {
    try {
        const major = await MajorModel.find({});
        res.status(200).json(major);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}
