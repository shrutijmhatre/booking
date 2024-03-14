import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";

dotenv.config();

const authenticate = (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const header = req.headers.authorization;
    if (!header) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const token = header.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const decode = jwt.verify(token, process.env.JWT_SECRET || "");
    if (!decode) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    
    next();
  };

export { authenticate };