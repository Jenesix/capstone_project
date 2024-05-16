import { Request, Response } from "express";
import { UserModel } from "../Model/Schema";
import { comparePassword } from "../utils/PasswordManager";
import jwt from "jsonwebtoken";
import { secret_jwt } from "../config/config";

export const Login = async (req: Request, res: Response) => {
    try {
        const { user_id, password } = req.body;
        const user = await UserModel.findOne({ user_id: user_id });
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }
        const isPasswordValid = await comparePassword(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid password" });
        }
        const payload = jwt.sign({ UserID: user._id, role: user.role }, String(secret_jwt), { algorithm: "HS256" });
        res.cookie("token", payload, { httpOnly: true });
        return res.status(200).json({ message: "Login success", payload: payload });
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
};
