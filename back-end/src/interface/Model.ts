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
    AssignmentID: ObjectId[];
    AttendanceID: ObjectId[];

    FacultyID: ObjectId;
    DepartmentID: ObjectId;
    MajorID: ObjectId;
}

export interface Faculty {
    faculty_name: string;
    // Foreign Key
    DepartmentID: ObjectId[];
    MajorID: ObjectId[];
}

export interface Department {
    department_name: string;
    // Foreign Key
    FacultyID: ObjectId;
    MajorID: ObjectId[];
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

export interface Assignment {
    assignment_name: string;
    description_asm: string;
    due_date: Date;
    turnin_date: Date;
    status_asm: string;
    score: number;
    // Foreign Key
    ClassID: ObjectId[];
    UserID: ObjectId[];
}

export interface Resource {
    resource_file: string;
    // Foreign Key
    ClassID: ObjectId[];
}

export interface Attendance {
    date_atd: Date;
    time_expire: Date;
    time_check: Date;
    status_atd: string;
    note_atd: string;
    // Foreign Key
    ClassID: ObjectId;
    UserID: ObjectId; // student
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
