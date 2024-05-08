import { Request, Response } from "express";

export const Logout = async (req: Request, res: Response) => {
    try {
        res.clearCookie("token");
        res.status(200).json({ message: "Logout success" });
    } catch (error: any) {
        console.log(error.message);
    }
};