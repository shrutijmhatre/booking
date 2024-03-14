import express from "express";
import {
  registerUser,
  authenticateUser,
  logoutUser
} from "../controllers/authController";
import { validateData } from '../middleware/validationMiddleware';
import { userRegistrationSchema, userLoginSchema} from '../schemas/user.schema'

const authRoutes = express.Router();

/**
 * Register new user
 * @route POST /api/register
 */
authRoutes.post("/register", validateData(userRegistrationSchema), registerUser);

/**
 * Login users
 * @route POST /api/login
 */
authRoutes.post("/login", validateData(userLoginSchema), authenticateUser);

/**
 * Logout users
 * @route POST /api/logout
 */
authRoutes.post("/logout", logoutUser);


export default authRoutes;