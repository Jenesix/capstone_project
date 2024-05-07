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
    MajorID: ObjectId[];
}

export interface Major {
    major_name: string;
}

export interface Class {
    class_name: string;
    class_code: string;
    section: number;
    // Foreign Key
    UserID: ObjectId[];
    SyllabusID: ObjectId;
    AssignmentID: ObjectId[];
    AnnouncementID: ObjectId[];
    ResourceID: ObjectId[];
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
    status_atd: string;
    timestamp: Date;
    // Foreign Key
    ClassID: ObjectId;
    UserID: ObjectId; // student
}

export interface Post {
    title_p: string;
    description_p: string;
    post_image: string;
    // Foreign Key
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
    UserID: ObjectId; // teacher
}
