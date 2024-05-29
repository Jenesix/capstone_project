import { Request, Response } from "express";
import { UserModel, FacultyModel, DepartmentModel, MajorModel } from "../../Model/Schema";

export const UpdateUser = async (req: Request, res: Response) => {
    try {
        const { userID } = req.params;
        const updateFields = req.body;

        if (updateFields.faculty) {
            const findFac = await FacultyModel.findOne({ faculty_name: updateFields.faculty });
            if (!findFac) {
                return res.status(400).json({ message: "Faculty not found" });
            }
        }
        if (updateFields.department) {
            const findDep = await DepartmentModel.findOne({ department_name: updateFields.department });
            if (!findDep) {
                return res.status(400).json({ message: "Invalid department" });
            }
        }
        if (updateFields.major) {
            const findMajor = await MajorModel.findOne({ major_name: updateFields.major });
            if (!findMajor) {
                return res.status(400).json({ message: "Invalid major" });
            }
        }

        const result = await UserModel.findByIdAndUpdate(userID, updateFields, { new: true });
        if (!result) {
            return res.status(400).json({ message: "User not found" });
        }

        return res.status(200).json({ message: "Update user success", result });
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
};
