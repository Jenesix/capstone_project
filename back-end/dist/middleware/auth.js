"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isLogin = exports.validateToken = void 0;
const validateToken = (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ message: "No token" });
        }
        next();
    }
    catch (error) {
        console.log(error);
    }
};
exports.validateToken = validateToken;
const isLogin = (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (token) {
            return res.status(401).json({ message: "You are already logged in" });
        }
        next();
    }
    catch (error) {
        console.log(error.message);
    }
};
exports.isLogin = isLogin;
