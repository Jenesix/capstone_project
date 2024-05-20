import { ObjectId } from "mongoose";

// _id = real ID number
// ID = ObjectId in mongo
export interface User {
    user_id: string;
    password: string;
    role: string; // student, teacher, admin
    email: string;
    firstname: string;
    lastname: string;
    birthdate: Date;
    phonenumber: string;
    // Foreign Key
    ClassID: ObjectId[];
    FacultyID: ObjectId;
    DepartmentID: ObjectId;
    MajorID: ObjectId;
}

export interface Faculty {
    faculty_name: string;
    // Foreign Key
    // DepartmentID: ObjectId[];
    // MajorID: ObjectId[];
}

export interface Department {
    department_name: string;
    // Foreign Key
    FacultyID: ObjectId;
    // MajorID: ObjectId[];
}

export interface Major {
    major_name: string;
    // Foreign Key
    FacultyID: ObjectId;
    DepartmentID: ObjectId;
}

export interface Class {
    class_name: string;
    class_code: string;
    section: number;
    semester: number; // 1, 2
    year: number;
    // Foreign Key
    UserID: ObjectId[];
}

export interface Syllabus {
    file_syl: string;
    // Foreign Key
    ClassID: ObjectId;
}

// teacher
export interface Assignment {
    assignment_name: string;
    description_asm: string; // description
    due_date: Date;
    fullscore: number;
    file_asm: string;
    // Foreign Key
    ClassID: ObjectId;
    TurninID: ObjectId[];
}
// student
export interface AssignmentTurnin {
    turnin_date: Date;
    status_turnin: string; // compare turnin_date & due_date from frontend
    score: number;
    file_turnin: string;
    // Foreign Key
    AssignmentID: ObjectId;
    UserID: ObjectId;
}

export interface ResourceFolder {
    folder_name: string;
    // Foreign Key
    ClassID: ObjectId;
}
export interface Resource {
    file_rs: string;
    // Foreign Key
    ClassID: ObjectId;
    ResourceFolderID: ObjectId;
}

// teacher
export interface Attendance {
    date_atd: Date;
    time_start: string;
    // Foreign Key
    ClassID: ObjectId;
    CheckID: ObjectId[];
}
// student
export interface AttendanceCheck {
    time_check: Date;
    status_atd: string;
    note_atd: string;
    // Foreign Key
    UserID: ObjectId; // student
    AttendanceID: ObjectId;
}

export interface Post {
    title_p: string;
    description_p: string; // description
    post_image: string;
    time_p: Date; // datetime created
    // Foreign Key
    ClassID: ObjectId;
    UserID: ObjectId;
    CommentID: ObjectId[];
}

export interface Comment {
    comment: string;
    time_cm: Date; // datetime created
    // Foreign Key
    UserID: ObjectId;
    PostID: ObjectId;
}

export interface Announcement {
    title_anm: string;
    description_anm: string; // description
    time_anm: Date; // datetime created
    // Foreign Key
    ClassID: ObjectId;
    UserID: ObjectId;
}
