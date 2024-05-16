"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const RegisterController_1 = require("../Controller/RegisterController");
const LoginController_1 = require("../Controller/LoginController");
const auth_1 = require("../middleware/auth");
const LogoutController_1 = require("../Controller/LogoutController");
const GetUser_1 = require("../Controller/User/GetUser");
const GetUserByID_1 = require("../Controller/User/GetUserByID");
const UpdateUser_1 = require("../Controller/User/UpdateUser");
const DeleteUser_1 = require("../Controller/User/DeleteUser");
const CreatePost_1 = require("../Controller/User/post/CreatePost");
const CreateAnnounce_1 = require("../Controller/User/announcement/CreateAnnounce");
const EditAnnounce_1 = require("../Controller/User/announcement/EditAnnounce");
const GetAnnounce_1 = require("../Controller/User/announcement/GetAnnounce");
const DeleteAnnounce_1 = require("../Controller/User/announcement/DeleteAnnounce");
const router = express_1.default.Router();
router.get("/", (req, res) => {
    res.send({ message: "User router" });
});
// auth
router.post("/register", RegisterController_1.Register);
router.post("/login", LoginController_1.Login);
router.get("/logout", LogoutController_1.Logout);
// User
router.get("/getuser", auth_1.validateToken, GetUser_1.GetUser); // get all user
router.get("/getuserbyid", GetUserByID_1.GetUserByID); // must login
router.put("/updateuser/:userID", UpdateUser_1.UpdateUser);
router.delete("/deleteuser/:userID", DeleteUser_1.DeleteUser);
// Post
router.post("/createpost/:classID", CreatePost_1.CreatePost);
// Announcement
router.post("/createannounce/:classID", CreateAnnounce_1.CreateAnnounce);
router.put("/editannounce/:announceID", EditAnnounce_1.EditAnnounce);
router.get("/getannounce/:classID", GetAnnounce_1.GetAnnounce); // get all announcement of each class
router.delete("/deleteannounce/:announceID", DeleteAnnounce_1.DeleteAnnounce);
exports.default = router;
