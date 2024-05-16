import express from "express";
import { AddFaculty } from "../Controller/Admin/faculty/AddFaculty";
import { EditFaculty } from "../Controller/Admin/faculty/EditFaculty";
import { DeleteFaculty } from "../Controller/Admin/faculty/DeleteFaculty";
import { GetFaculty } from "../Controller/Admin/faculty/GetFaculty";
import { AddDepartment } from "../Controller/Admin/department/AddDepartment";
import { EditDepartment } from "../Controller/Admin/department/EditDepartment";
import { DeleteDepartment } from "../Controller/Admin/department/DeleteDepartment";
import { GetDepartment } from "../Controller/Admin/department/GetDepartment";
import { AddMajor } from "../Controller/Admin/major/AddMajor";
import { EditMajor } from "../Controller/Admin/major/EditMajor";
import { DeleteMajor } from "../Controller/Admin/major/DeleteMajor";
import { GetMajor } from "../Controller/Admin/major/GetMajor";
import { CreateClass } from "../Controller/Admin/Class/CreateClass";
import { GetClass } from "../Controller/Admin/Class/GetClass";
import { EditClass } from "../Controller/Admin/Class/EditClass";
import { DeleteClass } from "../Controller/Admin/Class/DeleteClass";
import { addUserToClass } from "../Controller/Admin/Class/addUserToClass";
import { deleteUserClass } from "../Controller/Admin/Class/deleteUserFromClass";

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
router.post("/add-department", AddDepartment);
router.put("/editdepartment/:departmentID", EditDepartment);
router.delete("/deletedepartment/:departmentID", DeleteDepartment);
router.get("/getdepartment", GetDepartment);

// Major
router.post("/addmajor", AddMajor);
router.put("/editmajor/:majorID", EditMajor);
router.delete("/deletemajor/:majorID", DeleteMajor);
router.get("/getmajor", GetMajor);

// Class
router.post("/createclass", CreateClass);
router.get("/getclass", GetClass);
router.put("/editclass/:classID", EditClass);
router.delete("/deleteclass/:classID", DeleteClass);
router.put("/addusertoclass/:classID", addUserToClass);
router.delete("/deleteuserclass/:classID/:userID", deleteUserClass); // delete user from class

export default router;
