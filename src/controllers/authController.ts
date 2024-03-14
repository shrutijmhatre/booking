import { Request, Response } from "express";
import {User} from "../models/User";
import { generateToken, clearToken } from "../util/auth";
import {
  BadRequestError,
  AuthenticationError,
} from "../middleware/errorMiddleware";
import asyncHandler from "express-async-handler";
import { hashSync, compareSync} from 'bcrypt'

const registerUser = asyncHandler(async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  const userExists = await User.findOne({ where: { email: email } });

  if (userExists) {
    res.status(409).json({ message: "The email already exists" });
  }

  const user = await User.create({
    name,
    email,
    password: hashSync(password, 8),
  });

  if (user) {
    generateToken(res, user.email);
    res.status(201).json({
      id: user.id,
      name: user.name,
      email: user.email,
    });
  } else {
    throw new BadRequestError("An error occurred in registering the user");
  }
});

const authenticateUser = asyncHandler(async (req: Request, res: Response) => {
  const { email, password} = req.body;
  const user = await User.findOne({ where: { email: email } });

  if (user &&  (compareSync(password, user.password))) {
 generateToken(res, user.email);
    res.status(200).json({
      id: user.user_id,
      name: user.name,
      email: user.email,
    });
  } else {
    throw new AuthenticationError("User not found");
  }
});

const logoutUser = asyncHandler(async (_req: Request, res: Response) => {
  clearToken(res);
  res.status(200).json({ message: "Successfully logged out" });
});

export { registerUser, authenticateUser, logoutUser };