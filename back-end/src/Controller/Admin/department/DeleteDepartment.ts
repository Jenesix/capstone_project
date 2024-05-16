import { Request, Response } from "express";
import { DepartmentModel } from "../../../Model/Schema";

export const DeleteDepartment = async (req: Request, res: Response) => {
    try {
        const { departmentID } = req.params;
        const result = await DepartmentModel.findByIdAndDelete(departmentID);
        if (!result) {
            return res.status(400).json({ message: "Department not found" });
        }
        res.status(200).json({ message: "Delete department success" });
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
};
