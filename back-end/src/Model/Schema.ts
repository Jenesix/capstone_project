import { Schema, model } from "mongoose";
import { User, Faculty, Department, Major, Class, Post } from '../interface/Model';

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
    SyllabusID: {
        type: Schema.Types.ObjectId,
        ref: "Syllabus"
    },
    AssignmentID: [
        {
            type: Schema.Types.ObjectId,
            ref: "Assignment"
        }
    ],
    AnnouncementID: [
        {
            type: Schema.Types.ObjectId,
            ref: "Announcement"
        }
    ],
    ResourceID: [
        {
            type: Schema.Types.ObjectId,
            ref: "Resource"
        }
    ],
    AttendanceID: [
        {
            type: Schema.Types.ObjectId,
            ref: "Attendance"
        }
    ],
    PostID: [
        {
            type: Schema.Types.ObjectId,
            ref: "Post"
        }
    ]
});
export const ClassModel = model<Class>("Class", Class);

const Post = new Schema<Post>({
    title_p: String,
    description_p: String,
    post_image: String,
    ClassID: {
        type: Schema.Types.ObjectId,
        ref: "Class"
    },
    OwnerID: {
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
