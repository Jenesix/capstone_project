import express from "express";
import { Register } from "../Controller/RegisterController";
import { Login } from "../Controller/LoginController";
import { validateToken } from "../middleware/auth";
import { Logout } from "../Controller/LogoutController";
import { GetUser } from "../Controller/User/GetUser";
import { GetUserByID } from "../Controller/User/GetUserByID";
import { UpdateUser } from "../Controller/User/UpdateUser";
import { DeleteUser } from "../Controller/User/DeleteUser";
import { CreatePost } from "../Controller/User/post/CreatePost";

const router = express.Router();

router.get("/", (req, res) => {
    res.send({ message: "User router" });
});

// auth
router.post("/register", Register);
router.post("/login", Login);
router.get("/logout", Logout);

// User
router.get("/getuser", validateToken, GetUser); // get all user
router.get("/getuserbyid", GetUserByID); // must login
router.put("/updateuser/:userID", UpdateUser);
router.delete("/deleteuser/:userID", DeleteUser);

// Post
router.post("/createpost/:classID", CreatePost);

export default router;
