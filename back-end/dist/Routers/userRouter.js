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
const GetUser_id_1 = require("../Controller/User/GetUser_id");
const UpdateUser_1 = require("../Controller/User/UpdateUser");
const DeleteUser_1 = require("../Controller/User/DeleteUser");
const router = express_1.default.Router();
router.get("/", (req, res) => {
    res.send({ message: "User router" });
});
// auth
router.post("/register", auth_1.isLogin, RegisterController_1.Register);
router.post("/login", LoginController_1.Login);
router.get("/logout", LogoutController_1.Logout);
// User
router.get("/getuser", auth_1.validateToken, GetUser_1.GetUser);
router.get("/getuserbyid", GetUser_id_1.GetUser_id);
router.put("/updateuser/:userID", UpdateUser_1.UpdateUser);
router.delete("/deleteuser/:userID", DeleteUser_1.DeleteUser);
exports.default = router;
