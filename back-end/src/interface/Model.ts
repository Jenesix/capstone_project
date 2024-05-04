import { ObjectId } from "mongoose";

export interface Student {
    studentID: string;
    password: string;
    email: string;
    firstname: string;
    lastname: string;
    birthdate: Date;
}

export interface TeacherInterface {
    teacherID: string;
    password: string;
    email: string;
    firstname: string;
    lastname: string;
    birthdate: Date;
}

export interface FacultyInterface {
    faculty: string;

}