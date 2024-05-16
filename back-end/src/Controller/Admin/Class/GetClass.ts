import { Request, Response } from "express";
import { ClassModel } from "../../../Model/Schema";

export const GetClass = async (req: Request, res: Response) => {
    try {
        const classes = await ClassModel.find({});
        res.status(200).json(classes);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
};
