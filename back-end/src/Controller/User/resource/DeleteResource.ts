import { Request, Response } from "express";
import { ResourceModel } from "../../../Model/Schema";

export const DeleteResource = async (req: Request, res: Response) => {
    try {
        const { resourceID } = req.params;
        const result = await ResourceModel.findByIdAndDelete(resourceID);
        if (!result) {
            return res.status(400).json({ message: "Resource not found" });
        }
        return res.status(200).json({ message: "Delete resource success" });
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
};
