const express = require('express');
const router = express.Router();
const hallBookingController = require('../controllers/hallBookingController');
const authenticate = require("../../authService/middleware/authenticate");


// router.post('/hall-booking-system/bookings',authenticate, hallBookingController.createHallBooking);

// router.get('/hall-booking-system/bookings', authenticate, hallBookingController.getHallBookings);
// router.get('/hall-booking-system/bookingsAdmin', authenticate, hallBookingController.getHallBookingAdmin);
// router.get('/hall-booking-system/bookingsHod', authenticate, hallBookingController.getHallBookingHod);

// router.get('/hall-booking-system/events',  hallBookingController.getHallEvents);
// router.get('/hall-booking-system/bookingsView/:bookingId',authenticate, hallBookingController.getHallBookingById);
// // router.get('/hall-booking-system/bookings/:id', hallBookingController.getHallBookingById);
// router.get('/hall-booking-system/bookingsFaculty',authenticate,  hallBookingController.getHallBookingByUserId);
// router.put('/hall-booking-system/bookingsEdit/:bookingId',authenticate, hallBookingController.updateHallBooking);
// router.delete('/hall-booking-system/bookings/:bookingId',authenticate, hallBookingController.deleteHallBooking);



router.post('/bookings', authenticate, hallBookingController.createHallBooking);
router.get('/bookings', authenticate, hallBookingController.getHallBookings);
router.get('/bookingsAdmin', authenticate, hallBookingController.getHallBookingAdmin);
router.get('/bookingsHod', authenticate, hallBookingController.getHallBookingHod);
router.get('/events', hallBookingController.getHallEvents);
router.get('/bookingsView/:bookingId', authenticate, hallBookingController.getHallBookingById);
router.get('/bookingsFaculty', authenticate, hallBookingController.getHallBookingByUserId);
router.put('/bookingsEdit/:bookingId', authenticate, hallBookingController.updateHallBooking);
router.delete('/bookings/:bookingId', authenticate, hallBookingController.deleteHallBooking);

module.exports = router;
