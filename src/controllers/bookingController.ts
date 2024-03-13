import { Request, Response } from 'express';
import { Booking} from '../models/Booking';

export const createBooking = async (req: Request, res: Response) => {
    const { title, description } = req.body;
    const booking = await Booking.create({ title, description });
    res.status(201).json(booking);
};

export const getBookings = async (_: Request, res: Response) => {
    const bookings = await Booking.findAll();
    res.status(200).json(bookings);
};

export const getBookingById = async (req: Request, res: Response) => {
    const { id } = req.params;
  
    // Find the booking by its primary key (ID)
    const booking = await Booking.findByPk(id);
  
    // Check if the booking exists
    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    res.status(200).json(booking);
};

export const updateBooking = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { title, description } = req.body;
  
    // Find the booking by its primary key (ID)
    const booking = await Booking.findByPk(id);
  
    // Check if the booking exists
    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }
  
    // Update booking properties with the new values
    booking.title = title;
    booking.description = description;
  
    // Save the updated booking to the database
    await booking.save();
  
    res.status(201).json(booking);
};

export const deleteBooking = async (req: Request, res: Response) => {
    // Find the booking by its primary key (ID)
    const { id } = req.params;
    const booking = await Booking.findByPk(id);
  
    // Check if the booking exists
    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }
  
    // Delete the booking from the database
    await booking.destroy();
    // Respond with a success message
    res.status(200).json({ message: 'Booking deleted successfully' });
};
  