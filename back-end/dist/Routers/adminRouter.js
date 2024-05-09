"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const AddFaculty_1 = require("../Controller/Admin/faculty/AddFaculty");
const EditFaculty_1 = require("../Controller/Admin/faculty/EditFaculty");
const DeleteFaculty_1 = require("../Controller/Admin/faculty/DeleteFaculty");
const router = express_1.default.Router();
router.get("/", (req, res) => {
    res.send({ message: "Admin router" });
});
// Faculty
router.post("/addfaculty", AddFaculty_1.AddFaculty);
router.put("/editfaculty/:facultyID", EditFaculty_1.EditFaculty);
router.delete("/deletefaculty/:facultyID", DeleteFaculty_1.DeleteFaculty);
exports.default = router;
