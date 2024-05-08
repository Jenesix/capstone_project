"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const RegisterController_1 = require("../Controller/RegisterController");
const LoginController_1 = require("../Controller/LoginController");
const auth_1 = require("../middleware/auth");
const Logout_1 = require("../Controller/Logout");
const router = express_1.default.Router();
router.get("/", (req, res) => {
    res.send({ message: "User router" });
});
// auth
router.post("/register", auth_1.isLogin, RegisterController_1.Register);
router.post("/login", LoginController_1.Login);
router.get("/logout", Logout_1.Logout);
exports.default = router;
