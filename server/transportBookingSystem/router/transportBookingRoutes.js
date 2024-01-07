const express = require('express');
const router = express.Router();
const transportBookingController = require('../controllers/transportBookingController');
const authenticate = require("../../authService/middleware/authenticate");



router.get('/bookings', authenticate, transportBookingController.getTransportBookings);
router.get('/bookingsAdmin', authenticate, transportBookingController.getTransportBookingAdmin);
router.get('/bookingsHod', authenticate, transportBookingController.getTransportBookingHod);

router.get('/events',  transportBookingController.getTransportEvents);


router.get('/bookingsView/:bookingId',authenticate, transportBookingController.getTransportBookingById);
// router.get('/bookings/:id', transportBookingController.getTransportBookingById);
router.get('/bookingsFaculty',authenticate,  transportBookingController.getTransportBookingByUserId);
router.post('/bookings',authenticate, transportBookingController.createTransportBooking);
router.put('/bookingsEdit/:bookingId',authenticate, transportBookingController.updateTransportBooking);
router.delete('/bookings/:bookingId',authenticate, transportBookingController.deleteTransportBooking);

module.exports = router;
