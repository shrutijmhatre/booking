import { Request, Response } from "express";
import {User} from "../models/User";
import { generateToken, clearToken } from "../util/auth";
import {
  BadRequestError,
  AuthenticationError,
} from "../middleware/errorMiddleware";
import asyncHandler from "express-async-handler";
import {genSaltSync, hashSync, compareSync} from 'bcrypt'
import { userDTO } from "../types/dto";

const registerUser = asyncHandler(async (req: Request, res: Response) => {
  const { name, email, password, isAdmin } = req.body;
  const userExists =  User.length !==0 && User.findOne({ where: { email: email } });

  if (userExists) {
    res.status(409).json({ message: "The user already exists" });
  }
  
  const user = await User.create({
    name,
    email,
    password: hashSync(password, genSaltSync(10)),
    isAdmin
  });

  if (user) {
    let payload: userDTO = { 
      userId: user.userId,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin
    }; 
    generateToken(res, payload);
    res.status(201).json(payload);
  } else {
    throw new BadRequestError("An error occurred in registering the user");
  }
});

const authenticateUser = asyncHandler(async (req: Request, res: Response) => {
  const { email, password} = req.body;
  const user = await User.findOne({ where: { email: email } });

  if (user &&  (compareSync(password, user.password))) {
    let payload: userDTO = { 
      userId: user.userId,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin
    }; 
    generateToken(res, payload);
    res.status(200).json(payload);
  } else {
    throw new AuthenticationError("User not found");
  }
});

const logoutUser = asyncHandler(async (_req: Request, res: Response) => {
  clearToken(res);
  res.status(200).json({ message: "Successfully logged out" });
});

export { registerUser, authenticateUser, logoutUser };