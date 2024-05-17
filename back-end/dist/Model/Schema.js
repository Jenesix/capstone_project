"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostModel = exports.ResourceModel = exports.AnnouncementModel = exports.ClassModel = exports.MajorModel = exports.DepartmentModel = exports.FacultyModel = exports.UserModel = void 0;
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
    // DepartmentID: [
    //     {
    //         type: Schema.Types.ObjectId,
    //         ref: "Department"
    //     }
    // ],
    // MajorID: [
    //     {
    //         type: Schema.Types.ObjectId,
    //         ref: "Major"
    //     }
    // ]
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
    // MajorID: [
    //     {
    //         type: Schema.Types.ObjectId,
    //         ref: "Major"
    //     }
    // ]
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
const Class = new mongoose_1.Schema({
    class_name: {
        type: String,
        required: true,
    },
    class_code: {
        type: String,
        required: true
    },
    section: {
        type: Number,
        required: true
    },
    semester: {
        type: Number,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    UserID: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "User"
        }
    ],
});
exports.ClassModel = (0, mongoose_1.model)("Class", Class);
const Announcement = new mongoose_1.Schema({
    title_anm: String,
    desc_anm: String,
    time_anm: Date,
    ClassID: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Class"
    },
    UserID: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User"
    }
});
exports.AnnouncementModel = (0, mongoose_1.model)("Announcement", Announcement);
const Resource = new mongoose_1.Schema({
    file_rs: String,
    ClassID: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Class"
    },
    ResourceFolderID: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "ResourceFolder"
    }
});
exports.ResourceModel = (0, mongoose_1.model)("Resource", Resource);
const Post = new mongoose_1.Schema({
    title_p: String,
    desc_p: String,
    post_image: String,
    ClassID: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Class"
    },
    UserID: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User"
    },
    CommentID: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "Comment"
        }
    ]
});
exports.PostModel = (0, mongoose_1.model)("Post", Post);
