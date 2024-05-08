"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Register = void 0;
const Schema_1 = require("../Model/Schema");
const PasswordManager_1 = require("../utils/PasswordManager");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config/config");
const Register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { user_id, password, role, email, firstname, lastname, birthdate, phonenumber, FacultyID, DepartmentID, MajorID } = req.body;
        const user = new Schema_1.UserModel({
            user_id,
            password: yield (0, PasswordManager_1.hashPassword)(password),
            role: role || "student",
            email,
            firstname,
            lastname,
            birthdate,
            phonenumber,
            FacultyID,
            DepartmentID,
            MajorID
        });
        yield user.save();
        const playload = jsonwebtoken_1.default.sign({ UserID: user._id }, String(config_1.secret_jwt), { algorithm: "HS256" });
        res.cookie("token", playload, { httpOnly: true });
        res.status(200).send({
            message: "Register success",
            user
        });
    }
    catch (error) {
        console.log(error);
    }
});
exports.Register = Register;
