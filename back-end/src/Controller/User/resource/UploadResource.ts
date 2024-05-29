import { Request, Response } from "express";
import { ResourceModel, ClassModel, ResourceFolderModel } from "../../../Model/Schema";
import { uploadResourceFile } from "../../../utils/UploadFile";

export const UploadResource = async (req: Request, res: Response) => {
    try {
        const { classID, folderID } = req.query;
        const files = req.files as Express.Multer.File[];

        const findClass = await ClassModel.findById(classID);
        if (!findClass) {
            return res.status(400).json({ message: "Class not found" });
        }

        if (!files || files.length === 0) {
            return res.status(400).json({ message: "Please upload files" });
        }

        const uploadPromises = files.map(async (file: Express.Multer.File) => {
            const fileUrl = await uploadResourceFile(file);
            const resourceData = {
                file_rs: fileUrl,
                ClassID: classID,
                ...(folderID && { ResourceFolderID: folderID })
            };
            const resource = new ResourceModel(resourceData);
            
            const resourceFolder = await ResourceFolderModel.findById(folderID);
            if (resourceFolder) {
                await resourceFolder.updateOne({ $addToSet: { ResourceID: resource._id } });
            }

            return resource.save();
        });

        const resources = await Promise.all(uploadPromises);

        return res.status(200).json({ message: "Upload resource success", resources });

    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
};

// const file = req.file;

// // let fileUrl = "";
// // if (file) {
// //     fileUrl = await uploadFile(file);
// // }

// const findClass = await ClassModel.findById(classID);
// if (!findClass) {
//     return res.status(400).json({ message: "Class not found" });
// }

// if (!file) {
//     return res.status(400).json({ message: "Please upload a file" });
// }
// const fileUrl = await uploadResourceFile(file);

// if (!folderID) {
//     const resource = new ResourceModel({
//         file_rs: fileUrl,
//         ClassID: classID,
//     });
//     await resource.save();
//     return res.status(200).json({ message: "Upload resource success", resource });
// } else {
//     const resource = new ResourceModel({
//         file_rs: fileUrl,
//         ClassID: classID,
//         ResourceFolderID: folderID
//     });
//     await resource.save();
//     return res.status(200).json({ message: "Upload resource success", resource });
// }  