import express from "express";
import { Register } from "../Controller/RegisterController";
import { Login } from "../Controller/LoginController";
import { validateToken, isLogin } from "../middleware/auth";
import { Logout } from "../Controller/LogoutController";
import { GetUser } from "../Controller/User/GetUser";
import { GetUser_id } from "../Controller/User/GetUser_id";
import { UpdateUser } from "../Controller/User/UpdateUser";
import { DeleteUser } from "../Controller/User/DeleteUser";

const router = express.Router();

router.get("/", (req, res) => {
    res.send({ message: "User router" });
});

// auth
router.post("/register", isLogin, Register);
router.post("/login", Login);
router.get("/logout", Logout);

// User
router.get("/getuser", validateToken, GetUser);
router.get("/getuserbyid", GetUser_id);
router.put("/updateuser/:userID", UpdateUser);
router.delete("/deleteuser/:userID", DeleteUser);

export default router;
