import express from "express";
import {
  registerUser,
  authenticateUser,
  logoutUser
} from "../controllers/authController";

const authRoutes = express.Router();

/**
 * Register new user
 * @route POST /api/register
 */
authRoutes.post("/register", registerUser);

/**
 * Login users
 * @route POST /api/login
 */
authRoutes.post("/login", authenticateUser);

/**
 * Logout users
 * @route POST /api/logout
 */
authRoutes.post("/logout", logoutUser);


export default authRoutes;