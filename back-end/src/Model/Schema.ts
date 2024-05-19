import { Schema, model } from "mongoose";
import { User, Faculty, Department, Major, Class, Syllabus, Announcement, Resource, Post, Comment, Assignment, AssignmentTurnin, ResourceFolder } from '../interface/Model';

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
    // MajorID: [
    //     {
    //         type: Schema.Types.ObjectId,
    //         ref: "Major"
    //     }
    // ]
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



const Class = new Schema<Class>({
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
            type: Schema.Types.ObjectId,
            ref: "User"
        }
    ],
});
export const ClassModel = model<Class>("Class", Class);



const Syllabus = new Schema<Syllabus>({
    file_syl: String,
    ClassID: {
        type: Schema.Types.ObjectId,
        ref: "Class"
    }
});
export const SyllabusModel = model<Syllabus>("Syllabus", Syllabus);



const Announcement = new Schema<Announcement>({
    title_anm: String,
    description_anm: String,
    time_anm: Date,
    ClassID: {
        type: Schema.Types.ObjectId,
        ref: "Class"
    },
    UserID: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
});
export const AnnouncementModel = model<Announcement>("Announcement", Announcement);



const ResourceFolder = new Schema<ResourceFolder>({
    folder_name: String,
    ClassID: {
        type: Schema.Types.ObjectId,
        ref: "Class"
    }
});
export const ResourceFolderModel = model<ResourceFolder>("ResourceFolder", ResourceFolder);

const Resource = new Schema<Resource>({
    file_rs: {
        type: String,
        required: true
    },
    ClassID: {
        type: Schema.Types.ObjectId,
        ref: "Class"
    },
    ResourceFolderID: {
        type: Schema.Types.ObjectId,
        ref: "ResourceFolder"
    }
});
export const ResourceModel = model<Resource>("Resource", Resource);



const Post = new Schema<Post>({
    title_p: String,
    description_p: String,
    post_image: String,
    ClassID: {
        type: Schema.Types.ObjectId,
        ref: "Class"
    },
    UserID: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    CommentID: [
        {
            type: Schema.Types.ObjectId,
            ref: "Comment"
        }
    ]
});
export const PostModel = model<Post>("Post", Post);

const Comment = new Schema<Comment>({
    comment: String,
    time_cm: Date,
    UserID: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    PostID: {
        type: Schema.Types.ObjectId,
        ref: "Post"
    }
});
export const CommentModel = model<Comment>("Comment", Comment);



const Assignment = new Schema<Assignment>({
    assignment_name: String,
    description_asm: String,
    due_date: Date,
    fullscore: Number,
    status_asm: String,
    file_asm: String,
    ClassID: {
        type: Schema.Types.ObjectId,
        ref: "Class"
    }
});
export const AssignmentModel = model<Assignment>("Assignment", Assignment);

const AssignmentTurnin = new Schema<AssignmentTurnin>({
    turnin_date: Date,
    status_turnin: String,
    score: Number,
    file_turnin: String,
    AssignmentID: {
        type: Schema.Types.ObjectId,
        ref: "Assignment"
    },
    UserID: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
});
export const AssignmentTurninModel = model<AssignmentTurnin>("AssignmentTurnin", AssignmentTurnin);