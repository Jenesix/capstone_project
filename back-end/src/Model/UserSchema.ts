import { Schema, model } from "mongoose";
import { Student } from "../interface/Model";

const Student = new Schema<Student>({
    studentID: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    firstname: String,
    lastname: String,
    birthdate: Date,
});
export const StudentModel = model<Student>("Student", Student);
