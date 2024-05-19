import { Request, Response } from "express";

export const Logout = async (req: Request, res: Response) => {
    try {
        res.clearCookie("token");
        return res.status(200).json({ message: "Logout success" });
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
};
