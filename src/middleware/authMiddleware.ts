import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import {User} from "../models/User";
import { AuthenticationError } from "./errorMiddleware";
import asyncHandler from "express-async-handler";
import * as dotenv from "dotenv";

dotenv.config();

/* const verifyAdmin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let token = req.cookies.jwt;

    if (!token) {
      throw new AuthenticationError("Token not found");
    }

    const jwtSecret= process.env.JWT_SECRET || "";
    const decoded = jwt.verify(token, jwtSecret) as JwtPayload;

    if (!decoded || !decoded.userId ) {
      throw new AuthenticationError("User not found");
    }
   
    const user = await User.findByPk(decoded.userId);

    if (!user) {
      throw new AuthenticationError("User not found");
    }

    if(decoded.userId && decoded.isAdmin === true){
      next();
    }

  } catch (e) {
    throw new AuthenticationError("Invalid token");
  }
}; */

const authenticate =asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
  try {
    let token = req.cookies.jwt;

    if (!token) {
      throw new AuthenticationError("Token not found");
    }

    const jwtSecret= process.env.JWT_SECRET || "";
    const decoded = jwt.verify(token, jwtSecret) as JwtPayload;

    if (!decoded || !decoded.userId) {
      throw new AuthenticationError("UserId not found");
    }

    const user = await User.findByPk(decoded.userId);

    if (!user) {
      throw new AuthenticationError("User not found");
    }

    next(user);
  } catch (e) {
    throw new AuthenticationError("Invalid token");
  }
}
);

const verifyUser= asyncHandler(
  async (req: Request, res: Response, next: NextFunction) =>{
    try{
      authenticate(req, res, (user)=>{
        console.log("Verified user :", user);
        if(user && user.dataValues.isAdmin === false){
          next()
        }
      })
    }
    catch (e) {
      throw new AuthenticationError("Invalid token");
    }
    
  }
)

const verifyAdmin= asyncHandler(
  async (req: Request, res: Response, next: NextFunction) =>{
    try{
      authenticate(req, res, (user)=>{
        console.log("Verified user :", user);
        if(user && user.dataValues.isAdmin === true){
          next()
        }
      })
    }
    catch (e) {
      throw new AuthenticationError("Invalid token");
    }
    
  }
)


export {authenticate, verifyUser, verifyAdmin };