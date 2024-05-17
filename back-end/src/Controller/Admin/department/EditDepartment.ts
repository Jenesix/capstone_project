import { Request, Response } from "express";
import { DepartmentModel } from "../../../Model/Schema";

export const EditDepartment = async (req: Request, res: Response) => {
    try {
        const { departmentID } = req.params;
        const { department_name } = req.body;
        const result = await DepartmentModel.findByIdAndUpdate(departmentID, { department_name: department_name });
        if (!result) {
            return res.status(400).json({ message: "Department not found" });
        }
        res.status(200).json({ message: "Edit department_name success" });
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
};
