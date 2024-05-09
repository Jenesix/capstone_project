import express from "express";
import { AddFaculty } from "../Controller/Admin/faculty/AddFaculty";
import { EditFaculty } from "../Controller/Admin/faculty/EditFaculty";
import { DeleteFaculty } from "../Controller/Admin/faculty/DeleteFaculty";

const router = express.Router();

router.get("/", (req, res) => {
    res.send({ message: "Admin router" });
});

// Faculty
router.post("/addfaculty", AddFaculty);
router.put("/editfaculty/:facultyID", EditFaculty);
router.delete("/deletefaculty/:facultyID", DeleteFaculty);

export default router;
