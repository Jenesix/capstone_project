import { Request, Response } from "express";
import { UserModel, FacultyModel, DepartmentModel, MajorModel } from "../Model/Schema";
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
            faculty,
            department,
            major
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
            faculty,
            department,
            major
        });
        await user.save();

        const playload = jwt.sign({ UserID: user._id }, String(secret_jwt), { algorithm: "HS256" });
        res.cookie("token", playload, { httpOnly: true });

        return res.status(200).send({
            message: "Register success",
            user
        });
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
};
