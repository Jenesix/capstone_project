import express from "express";
import { Register } from "../Controller/RegisterController";
import { Login } from "../Controller/LoginController";
import { validateToken, isLogin } from "../middleware/auth";
import { Logout } from "../Controller/Logout";

const router = express.Router();

router.get("/", (req, res) => {
    res.send({ message: "User router" });
});

// auth
router.post("/register", isLogin, Register);
router.post("/login", Login);
router.get("/logout", Logout);

export default router;
