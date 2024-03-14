import express from 'express';
import {
  getBookings,
  getBookingById,
  createBooking,
  updateBooking,
  deleteBooking
} from '../controllers/bookingController';
import { validateData } from '../middleware/validationMiddleware';
import {bookingSchema} from '../schemas/booking.schema'
import { verifyAdmin} from "../middleware/authMiddleware"


// Create an Express router
const bookingRoutes = express.Router();

// Define routes for different booking-related actions

/**
 * Get all bookings
 * @route GET /api/bookings
 */
bookingRoutes.get('/', getBookings);

/**
 * Get a booking by id
 * @route GET /api/bookings/:id
 */
bookingRoutes.get('/:id', getBookingById);

/**
 * Create a new booking
 * @route POST /api/bookings
 */
bookingRoutes.post('/', validateData(bookingSchema), verifyAdmin, createBooking);

/**
 * Update a booking by ID
 * @route PUT /api/bookings/:id
 */
bookingRoutes.put('/:id', validateData(bookingSchema), verifyAdmin, updateBooking);

/**
 * Delete a bookings by ID
 * @route DELETE /api/bookings/:id
 */
bookingRoutes.delete('/:id', verifyAdmin, deleteBooking);

// Export the router for use in other parts of the application
export default bookingRoutes;