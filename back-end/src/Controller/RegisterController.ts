import { Request, Response } from "express";
import { UserModel } from "../Model/Schema";
import { hashPassword } from "../utils/PasswordManager";
import jwt from "jsonwebtoken";
import { secret_jwt } from "../config/config";

export const Register = async (req: Request, res: Response) => {
    try {
        const {
            user_id,
            password,
            role,
            email,
            firstname,
            lastname,
            birthdate,
            phonenumber,
            FacultyID,
            DepartmentID,
            MajorID
        } = req.body;

        const user = new UserModel({
            user_id,
            password: await hashPassword(password),
            role: role || "student",
            email,
            firstname,
            lastname,
            birthdate,
            phonenumber,
            FacultyID,
            DepartmentID,
            MajorID
        });

        await user.save();

        const playload = jwt.sign({ UserID: user._id }, String(secret_jwt), { algorithm: "HS256" });
        res.cookie("token", playload, { httpOnly: true });

        res.status(200).send({
            message: "Register success",
            user
        });
    } catch (error: any) {
        console.log(error);
    }
};
