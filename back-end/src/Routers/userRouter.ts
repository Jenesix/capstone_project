import express from "express";
import { Register } from "../Controller/RegisterController";
import { Login } from "../Controller/LoginController";
import { validateToken } from "../middleware/auth";
import { Logout } from "../Controller/LogoutController";
import { GetUser } from "../Controller/User/GetUser";
import { GetUserByID } from "../Controller/User/GetUserByID";
import { UpdateUser } from "../Controller/User/UpdateUser";
import { DeleteUser } from "../Controller/User/DeleteUser";
import { GetUserClass } from "../Controller/User/GetUserClass";
import { GetEnrollment } from "../Controller/User/GetEnrollment";
import { CreatePost } from "../Controller/User/post/CreatePost";
import { GetPost } from "../Controller/User/post/GetPost";
import { GetPostByID } from "../Controller/User/post/GetPostByID";
import { DeleletPost } from "../Controller/User/post/DeletePost";
import { EditPost } from "../Controller/User/post/EditPost";
import { CreateComment } from "../Controller/User/post/CreateComment";
import { DeleletComment } from "../Controller/User/post/DeleteComment";
import { CreateAnnounce } from "../Controller/User/announcement/CreateAnnounce";
import { EditAnnounce } from "../Controller/User/announcement/EditAnnounce";
import { GetAnnounce } from "../Controller/User/announcement/GetAnnounce";
import { DeleteAnnounce } from "../Controller/User/announcement/DeleteAnnounce";
import { UploadResource } from "../Controller/User/resource/UploadResource";
import { DeleteResource } from "../Controller/User/resource/DeleteResource";
import { GetResource } from "../Controller/User/resource/GetResource";
import { CreateAssign } from "../Controller/User/assignment/CreateAssign";
import { EditAssign } from "../Controller/User/assignment/EditAssign";
import { DeleteAssign } from "../Controller/User/assignment/DeleteAssign";
import { GetAssign } from "../Controller/User/assignment/GetAssign";
import { DeleteFileAssign } from "../Controller/User/assignment/DeleteFileAssign";
import { GetAssignByID } from "../Controller/User/assignment/GetAssignByID";
import { CreateTurnin } from "../Controller/User/assignment/CreateTurnin";
import { EditTurnin } from "../Controller/User/assignment/EditTurnin";
import { GetTurnin } from "../Controller/User/assignment/GetTurnin";
import { DeleteTurnin } from "../Controller/User/assignment/DeleteTurnin";
import { DeleteFileTurnin } from "../Controller/User/assignment/DeleteFileTurnin";
import { CreateFolder } from "../Controller/User/resource/CreateFolder";
import { EditFolder } from "../Controller/User/resource/EditFolder";
import { GetFolder } from "../Controller/User/resource/GetFolder";
import { DeleteFolder } from "../Controller/User/resource/DeleteFolder";
import { GetFolderByID } from "../Controller/User/resource/GetFolderByID";
import { CreateAttend } from "../Controller/User/attendance/CreateAttend";
import { EditAttend } from "../Controller/User/attendance/EditAttend";
import { DeleteAttend } from "../Controller/User/attendance/DeleteAttend";
import { GetAttend } from "../Controller/User/attendance/GetAttend";
import { CreateAttendCheck } from "../Controller/User/attendance/CreateAttendCheck";
import { EditAttendCheck } from "../Controller/User/attendance/EditAttendCheck";
import { DeleteAttendCheck } from "../Controller/User/attendance/DeleteAttendCheck";
import { GetAttendCheck } from "../Controller/User/attendance/GetAttendCheck";
import { GetAttendCheckUser } from "../Controller/User/attendance/GetAttendCheckUser";
import { CreateAttendCheckT } from "../Controller/User/attendance/CreateAttendCheckT";

const router = express.Router();

router.get("/", (req, res) => {
    res.send({ message: "User router" });
});

// auth
router.post("/register", Register);
router.post("/login", Login);
router.post("/logout", Logout);

// User
router.get("/getuser", validateToken, GetUser); // get all users, must login
router.get("/getuserbyid", GetUserByID); // must login
// router.get("/getuserbyid/:userID", GetUserByID);
router.put("/updateuser/:userID", UpdateUser);
router.delete("/deleteuser/:userID", DeleteUser);
router.get("/getuserclass/:classID", GetUserClass); // get all users of each class
router.get("/getenrollment/:userID", GetEnrollment); // get all classes of each user

// Post
router.post("/createpost/:classID", CreatePost);
router.get("/getpost/:classID", GetPost); // get all posts+comments of each class
router.get("/getpostbyid/:postID", GetPostByID); // get a post by id + comments
router.delete("/deletepost/:postID", DeleletPost);
router.put("/editpost/:postID", EditPost);

router.post("/createcomment/:postID", CreateComment);
router.delete("/deletecomment/:commentID", DeleletComment);

// Announcement
router.post("/createannounce/:classID", CreateAnnounce);
router.put("/editannounce/:announceID", EditAnnounce);
router.get("/getannounce/:classID", GetAnnounce); // get all announcements of each class
router.delete("/deleteannounce/:announceID", DeleteAnnounce);

// Resource
router.post("/uploadresource", UploadResource); // query classID and folderID
router.delete("/deleteresource/:resourceID", DeleteResource);
router.get("/getresource/:classID", GetResource); // get all resources of each class

// Resource Folder
router.post("/createfolder/:classID", CreateFolder);
router.put("/editfolder/:folderID", EditFolder); // edit name
router.get("/getfolder/:classID", GetFolder); // get all folders of each class
router.delete("/deletefolder/:folderID", DeleteFolder);
router.get("/getfolderbyid/:folderID", GetFolderByID); // get folder and all resources

// Assignment, for teacher
router.post("/createassign/:classID", CreateAssign);
router.put("/editassign/:assignID", EditAssign);
router.delete("/deleteassign/:assignID", DeleteAssign);
router.get("/getassign/:classID", GetAssign); // get all assignments of each class
router.get("/getassignbyid/:assignID", GetAssignByID); // get assignment and all submissions
router.delete("/deletefileassign/:assignID", DeleteFileAssign); // delete file from array **body: array

// Assignment Turn in
router.post("/createturnin/:assignID", CreateTurnin); // for student
router.put("/editturnin/:turninID", EditTurnin); // teacher edit score, student edit file
router.get("/getturnin/:assignID", GetTurnin); // get all submissions of each assignment
router.delete("/deleteturnin/:turninID", DeleteTurnin);
router.delete("/deletefileturnin/:turninID", DeleteFileTurnin); // delete file from array **body: array

// Attendance
router.post("/createattend/:classID", CreateAttend);
router.put("/editattend/:attendID", EditAttend);
router.delete("/deleteattend/:attendID", DeleteAttend);
router.get("/getattend/:classID", GetAttend); // get all attendances of each class
router.post("/createattendcheckt", CreateAttendCheckT); // query id

// Attendance Checked
router.post("/createattendcheck/:attendID", CreateAttendCheck);
router.put("/editattendcheck/:checkID", EditAttendCheck);
router.delete("/deleteattendcheck/:checkID", DeleteAttendCheck);
router.get("/getattendcheck/:attendID", GetAttendCheck); // get all checked of each attendances
router.get("/getattendcheckuser/:userID", GetAttendCheckUser); // get all checked of each students by id

export default router;
