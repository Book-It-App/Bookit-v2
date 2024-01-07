const express = require('express');
const router = express.Router();
const hallController = require('../controllers/hallController');
const authenticate = require("../../authService/middleware/authenticate");


router.get('/halls', hallController.getHalls);
router.get('/halls/:hallId',authenticate, hallController.getHallById);
router.post('/halls',authenticate, hallController.createHall);
router.put('/halls/:hallId',authenticate, hallController.updateHall);
router.delete('/halls/:hallId',authenticate, hallController.deleteHall);

// router.get('/hall-booking-system/halls', hallController.getHalls);
// router.get('/hall-booking-system/halls/:hallId',authenticate, hallController.getHallById);
// router.post('/hall-booking-system/halls',authenticate, hallController.createHall);
// router.put('/hall-booking-system/halls/:hallId',authenticate, hallController.updateHall);
// router.delete('/hall-booking-system/halls/:hallId',authenticate, hallController.deleteHall);

module.exports = router;
