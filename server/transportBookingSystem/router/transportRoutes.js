const express = require('express');
const router = express.Router();
const transportController = require('../controllers/transportController');
const authenticate = require("../../authService/middleware/authenticate");


router.get('/halls', transportController.getTransports);
router.get('/halls/:hallId',authenticate, transportController.getTransportById);
router.post('/halls',authenticate, transportController.createTransport);
router.put('/halls/:hallId',authenticate, transportController.updateTransport);
router.delete('/halls/:hallId',authenticate, transportController.deleteTransport);

module.exports = router;
