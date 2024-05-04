import { Request, Response, NextFunction } from "express";

export const validateToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: "No token" });
    }
    next();
  } catch (error: any) {
    console.log(error);
  }
};

export const isLogin = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies.token;
    if (token) {
      return res.status(401).json({ message: "You are logged in" });
    }
    next();
  } catch (error: any) {
    console.log(error.message);
  }
};
