import express from "express";
import { AddFaculty } from "../Controller/Admin/faculty/AddFaculty";
import { EditFaculty } from "../Controller/Admin/faculty/EditFaculty";
import { DeleteFaculty } from "../Controller/Admin/faculty/DeleteFaculty";
import { GetFaculty } from "../Controller/Admin/faculty/GetFaculty";
import { AddDepartment } from "../Controller/Admin/department/AddDepartment";
import { EditDepartment } from "../Controller/Admin/department/EditDepartment";
import { DeleteDepartment } from "../Controller/Admin/department/DeleteDepartment";
import { GetDepartment } from "../Controller/Admin/department/GetDepartment";

const router = express.Router();

router.get("/", (req, res) => {
    res.send({ message: "Admin router" });
});

// Faculty
router.post("/addfaculty", AddFaculty);
router.put("/editfaculty/:facultyID", EditFaculty);
router.delete("/deletefaculty/:facultyID", DeleteFaculty);
router.get("/getfaculty", GetFaculty);

// Department
router.post("/adddepartment", AddDepartment);
router.put("/editdepartment/:departmentID", EditDepartment);
router.delete("/deletedepartment/:departmentID", DeleteDepartment);
router.get("/getdepartment", GetDepartment);

// Major

export default router;
