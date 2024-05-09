import { Request, Response } from "express";
import { DepartmentModel } from "../../../Model/Schema";

export const AddDepartment = async (req: Request, res: Response) => {
    try {
        const { department_name } = req.body;
        const department = new DepartmentModel({
            department_name
        });
        await department.save();
        return res.status(200).json({ message: "Add department success" });
    } catch (error) {
        console.log(error);
    }
};
