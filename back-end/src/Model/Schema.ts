import { Schema, model } from "mongoose";
import { User } from "../interface/Model";

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
        ref: "Teacher"
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
export const UserModel = model<User>("Student", User);
