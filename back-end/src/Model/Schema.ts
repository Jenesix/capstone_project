import { Schema, model } from "mongoose";
import { User, Faculty, Department, Major } from '../interface/Model';

// _id = real ID number
// ID = ObjectId in mongo
const User = new Schema<User>({
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
            type: Schema.Types.ObjectId,
            ref: "Class"
        }
    ],
    AssignmentID: [
        {
            type: Schema.Types.ObjectId,
            ref: "Assignment"
        }
    ],
    FacultyID: {
        type: Schema.Types.ObjectId,
        ref: "Faculty",
        // required: true
    },
    DepartmentID: {
        type: Schema.Types.ObjectId,
        ref: "Department"
    },
    MajorID: {
        type: Schema.Types.ObjectId,
        ref: "Major"
    }
});
export const UserModel = model<User>("User", User);



const Faculty = new Schema<Faculty>({
    faculty_name: {
        type: String,
        required: true,
        unique: true
    },
    DepartmentID: [
        {
            type: Schema.Types.ObjectId,
            ref: "Department"
        }
    ],
    MajorID: [
        {
            type: Schema.Types.ObjectId,
            ref: "Major"
        }
    ]
});
export const FacultyModel = model<Faculty>("Faculty", Faculty);

const Department = new Schema<Department>({
    department_name: {
        type: String,
        required: true,
    },
    FacultyID: {
        type: Schema.Types.ObjectId,
        ref: "Faculty"
    },
    MajorID: [
        {
            type: Schema.Types.ObjectId,
            ref: "Major"
        }
    ]
});
export const DepartmentModel = model<Department>("Department", Department);

const Major = new Schema<Major>({
    major_name: {
        type: String,
        required: true,
        unique: true
    },
    FacultyID: {
        type: Schema.Types.ObjectId,
        ref: "Faculty"
    },
    DepartmentID: {
        type: Schema.Types.ObjectId,
        ref: "Department"
    }
});
export const MajorModel = model<Major>("Major", Major);
