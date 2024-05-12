"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const AddFaculty_1 = require("../Controller/Admin/faculty/AddFaculty");
const EditFaculty_1 = require("../Controller/Admin/faculty/EditFaculty");
const DeleteFaculty_1 = require("../Controller/Admin/faculty/DeleteFaculty");
const GetFaculty_1 = require("../Controller/Admin/faculty/GetFaculty");
const AddDepartment_1 = require("../Controller/Admin/department/AddDepartment");
const EditDepartment_1 = require("../Controller/Admin/department/EditDepartment");
const DeleteDepartment_1 = require("../Controller/Admin/department/DeleteDepartment");
const GetDepartment_1 = require("../Controller/Admin/department/GetDepartment");
const AddMajor_1 = require("../Controller/Admin/major/AddMajor");
const EditMajor_1 = require("../Controller/Admin/major/EditMajor");
const DeleteMajor_1 = require("../Controller/Admin/major/DeleteMajor");
const GetMajor_1 = require("../Controller/Admin/major/GetMajor");
const CreateClass_1 = require("../Controller/Admin/Class/CreateClass");
const GetClass_1 = require("../Controller/Admin/Class/GetClass");
const EditClass_1 = require("../Controller/Admin/Class/EditClass");
const DeleteClass_1 = require("../Controller/Admin/Class/DeleteClass");
const router = express_1.default.Router();
router.get("/", (req, res) => {
    res.send({ message: "Admin router" });
});
// Faculty
router.post("/addfaculty", AddFaculty_1.AddFaculty);
router.put("/editfaculty/:facultyID", EditFaculty_1.EditFaculty);
router.delete("/deletefaculty/:facultyID", DeleteFaculty_1.DeleteFaculty);
router.get("/getfaculty", GetFaculty_1.GetFaculty);
// Department
router.post("/add-department", AddDepartment_1.AddDepartment);
router.put("/editdepartment/:departmentID", EditDepartment_1.EditDepartment);
router.delete("/deletedepartment/:departmentID", DeleteDepartment_1.DeleteDepartment);
router.get("/getdepartment", GetDepartment_1.GetDepartment);
// Major
router.post("/addmajor", AddMajor_1.AddMajor);
router.put("/editmajor/:majorID", EditMajor_1.EditMajor);
router.delete("/deletemajor/:majorID", DeleteMajor_1.DeleteMajor);
router.get("/getmajor", GetMajor_1.GetMajor);
// Class
router.post("/createclass", CreateClass_1.CreateClass);
router.get("/getclass", GetClass_1.GetClass);
router.put("/editclass/:classID", EditClass_1.EditClass);
router.delete("/deleteclass/:classID", DeleteClass_1.DeleteClass);
exports.default = router;
