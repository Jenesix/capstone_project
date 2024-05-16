import { ObjectId } from "mongoose";

// _id = real ID number
// ID = ObjectId in mongo
export interface User {
    user_id: string;
    password: string;
    role: string; // student, teacher
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
    SyllabusID: ObjectId;
    AssignmentID: ObjectId[];
    AnnouncementID: ObjectId[];
    ResourceID: ObjectId[];
    AttendanceID: ObjectId[];
    PostID: ObjectId[];
}

export interface Syllabus {
    syllabus_file: string;
    // Foreign Key
    ClassID: ObjectId;
}

// teacher
export interface Assignment {
    assignment_name: string;
    description_asm: string;
    due_date: Date;
    fullscore: number;
    file_asm: string;
    // Foreign Key
    ClassID: ObjectId[];
    ResourceID: ObjectId;
}
// student
export interface AssignmentTurnin {
    turnin_date: Date;
    status_asm: string;
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
    resource_file: string;
    // Foreign Key
    ClassID: ObjectId[];
    ResourceFolderID: ObjectId;
}

// teacher
export interface Attendance {
    date_atd: Date;
    time_expire: Date;
    // Foreign Key
    ClassID: ObjectId;
}
// student
export interface AttendanceCheck {
    time_check: Date;
    status_atd: string;
    note_atd: string;
    // Foreign Key
    UserID: ObjectId; // student
    AttendaceID: ObjectId;
}

export interface Post {
    title_p: string;
    description_p: string;
    post_image: string;
    // Foreign Key
    ClassID: ObjectId;
    OwnerID: ObjectId;
    CommentID: ObjectId[];
}

export interface Comment {
    comment: string;
    // Foreign Key
    OwnerID: ObjectId;
    PostID: ObjectId;
}

export interface Announcement {
    title_anm: string;
    description_anm: string;
    // Foreign Key
    ClassID: ObjectId;
}
