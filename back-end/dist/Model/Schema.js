"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MajorModel = exports.DepartmentModel = exports.FacultyModel = exports.UserModel = void 0;
const mongoose_1 = require("mongoose");
// _id = real ID number
// ID = ObjectId in mongo
const User = new mongoose_1.Schema({
    user_id: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true
    },
    firstname: String,
    lastname: String,
    birthdate: Date,
    phonenumber: String,
    ClassID: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "Class"
        }
    ],
    AssignmentID: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "Assignment"
        }
    ],
    FacultyID: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Faculty",
        // required: true
    },
    DepartmentID: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Department"
    },
    MajorID: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Major"
    }
});
exports.UserModel = (0, mongoose_1.model)("User", User);
const Faculty = new mongoose_1.Schema({
    faculty_name: {
        type: String,
        required: true,
        unique: true
    },
    DepartmentID: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "Department"
        }
    ],
    MajorID: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "Major"
        }
    ]
});
exports.FacultyModel = (0, mongoose_1.model)("Faculty", Faculty);
const Department = new mongoose_1.Schema({
    department_name: {
        type: String,
        required: true,
    },
    FacultyID: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Faculty"
    },
    MajorID: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "Major"
        }
    ]
});
exports.DepartmentModel = (0, mongoose_1.model)("Department", Department);
const Major = new mongoose_1.Schema({
    major_name: {
        type: String,
        required: true,
        unique: true
    },
    FacultyID: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Faculty"
    },
    DepartmentID: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Department"
    }
});
exports.MajorModel = (0, mongoose_1.model)("Major", Major);