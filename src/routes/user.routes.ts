import express from 'express';
import {
  getUsers,
  getUserById
} from '../controllers/userController';
import { verifyAdmin} from "../middleware/authMiddleware"


// Create an Express router
const userRoutes = express.Router();

// Define routes for user actions

/**
 * Get all users
 * @route GET /api/users
 */
userRoutes.get('/', getUsers);

/**
 * Get a user by id
 * @route GET /api/users/:id
 */
userRoutes.get('/:id', getUserById);

export default userRoutes