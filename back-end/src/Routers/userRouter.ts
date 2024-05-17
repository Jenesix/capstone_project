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
import { CreatePost } from "../Controller/User/post/CreatePost";
import { CreateAnnounce } from "../Controller/User/announcement/CreateAnnounce";
import { EditAnnounce } from "../Controller/User/announcement/EditAnnounce";
import { GetAnnounce } from "../Controller/User/announcement/GetAnnounce";
import { DeleteAnnounce } from "../Controller/User/announcement/DeleteAnnounce";
import { UploadResource } from "../Controller/User/resource/UploadResource";
import { DeleteResource } from "../Controller/User/resource/DeleteResource";
import { GetResource } from "../Controller/User/resource/GetResource";

const router = express.Router();

router.get("/", (req, res) => {
    res.send({ message: "User router" });
});

// auth
router.post("/register", Register);
router.post("/login", Login);
router.get("/logout", Logout);

// User
router.get("/getuser", validateToken, GetUser); // get all users, must login
router.get("/getuserbyid", GetUserByID); // must login
router.put("/updateuser/:userID", UpdateUser);
router.delete("/deleteuser/:userID", DeleteUser);
router.get("/getuserclass/:classID", GetUserClass); // get all users of each class

// Post
router.post("/createpost/:classID", CreatePost);

// Announcement
router.post("/createannounce/:classID", CreateAnnounce);
router.put("/editannounce/:announceID", EditAnnounce);
router.get("/getannounce/:classID", GetAnnounce); // get all announcements of each class
router.delete("/deleteannounce/:announceID", DeleteAnnounce);

// Resource
router.post("/uploadresource/:classID", UploadResource); // for teacher
router.delete("/deleteresource/:resourceID", DeleteResource);
router.get("/getresource/:classID", GetResource); // get all resources of each class

export default router;
