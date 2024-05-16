import { Request, Response } from "express";
import { DepartmentModel } from "../../../Model/Schema";

export const GetDepartment = async (req: Request, res: Response) => {
    try {
        const department = await DepartmentModel.find({});
        res.status(200).json(department);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
};
