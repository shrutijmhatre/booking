import express from 'express';
import {
  getBookings,
  createBooking,
  updateBooking,
  deleteBooking
} from '../controllers/bookingController';

// Create an Express router
const bookingRoutes = express.Router();

// Define routes for different booking-related actions

/**
 * Get all bookings
 * @route GET /bookings
 */
bookingRoutes.get('/', getBookings);

/**
 * Get all booking by is
 * @route GET /bookings/:id
 */
bookingRoutes.get('/:id', getBookings);

/**
 * Create a new booking
 * @route POST /bookings
 */
bookingRoutes.post('/', createBooking);

/**
 * Update a booking by ID
 * @route PUT /bookings/:id
 */
bookingRoutes.put('/:id', updateBooking);

/**
 * Delete a bookings by ID
 * @route DELETE /bookings/:id
 */
bookingRoutes.delete('/:id', deleteBooking);

// Export the router for use in other parts of the application
export default bookingRoutes;