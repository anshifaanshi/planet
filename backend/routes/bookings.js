
import express from "express";
import { 
  createBooking, 
  getAllBookings, 
  updateBooking, 
  cancelBooking 
} from "../controllers/bookingController.js";

const router = express.Router();

// Get all bookings
router.get("/booking", getAllBookings);

// Create a booking
router.post("/booking", createBooking);

// Update booking by ID
router.put("/booking/:id", updateBooking);

// Delete booking by ID
router.delete("/booking/:id", cancelBooking);

export default router;
