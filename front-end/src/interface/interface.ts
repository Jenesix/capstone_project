// _id = real ID number
// ID = string in mongo
export interface User {
    _id: string;
    user_id: string;
    password: string;
    role: string; // student, teacher, admin
    email: string;
    firstname: string;
    lastname: string;
    birthdate: Date;
    phonenumber: string;
    // Foreign Key
    ClassID: string[];
    faculty: string; // get name from dropdown
    department: string;
    major: string;
    __v: number;
}

export interface Faculty {
    _id: string;
    faculty_name: string;
    __v: number;
}

export interface Department {
    _id: string;
    department_name: string;
    // Foreign Key
    FacultyID: string;
    __v: number;
}

export interface Major {
    _id: string;
    major_name: string;
    // Foreign Key
    FacultyID: string;
    DepartmentID: string;
    __v: number;
}

export interface Class {
    _id: string;
    class_name: string;
    class_code: string;
    section: number;
    semester: number; // 1, 2
    year: number;
    // Foreign Key
    UserID: string[];
    __v: number;
}

export interface Syllabus {
    _id: string;
    file_syl: string;
    // Foreign Key
    ClassID: string;
    __v: number;
}

// teacher
export interface Assignment {
    _id: string;
    assignment_name: string;
    description_asm: string; // description
    due_date: Date;
    fullscore: number;
    file_asm: string[];
    // Foreign Key
    ClassID: string;
    TurninID: string[];
    __v: number;
}

// student
export interface AssignmentTurnin {
    _id: string;
    turnin_date: Date;
    status_turnin: string; // compare turnin_date & due_date from frontend
    score: number;
    file_turnin: string[];
    // Foreign Key
    AssignmentID: string;
    UserID: string;
    __v: number;
}

export interface ResourceFolder {
    _id: string;
    folder_name: string;
    // Foreign Key
    ClassID: string;
    ResourceID: string[];
    __v: number;
}

export interface Resource {
    _id: string;
    file_rs: string;
    // Foreign Key
    ClassID: string;
    ResourceFolderID: string;
    __v: number;
}

// teacher
export interface Attendance {
    _id: string;
    date_atd: Date;
    time_start: string;
    // Foreign Key
    ClassID: string;
    CheckID: string[];
    __v: number;
}

// student
export interface AttendanceCheck {
    _id: string;
    time_check: Date;
    status_atd: string;
    note_atd: string;
    // Foreign Key
    UserID: string; // student
    AttendanceID: string;
    __v: number;
}

export interface Post {
    _id: string;
    title_p: string;
    description_p: string; // description
    post_image: string;
    time_p: Date; // datetime created
    // Foreign Key
    ClassID: string;
    UserID: string;
    CommentID: string[];
    __v: number;
}

export interface Comment {
    _id: string;
    comment: string;
    time_cm: Date; // datetime created
    // Foreign Key
    UserID: string;
    PostID: string;
    __v: number;
}

export interface Announcement {
    _id: string;
    title_anm: string;
    description_anm: string; // description
    time_anm: Date; // datetime created
    // Foreign Key
    ClassID: string;
    UserID: string;
    __v: number;
}
