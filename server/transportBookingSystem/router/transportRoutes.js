const express = require('express');
const multer = require("multer");

const router = express.Router();
const transportController = require('../controllers/transportController');
const authenticate = require("../../authService/middleware/authenticate");

// Set up multer storage for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "uploads/vehicle"); // Directory to save uploaded files
    },
    filename: function (req, file, cb) {
      cb(null, `${Date.now()}-${file.originalname}`); // Use the original file name
    },
  });
  const upload = multer({ storage: storage });

router.get('/transports', transportController.getTransports);
router.get('/transports/:transportId',authenticate, transportController.getTransportById);
router.post('/transports',authenticate,upload.single('photo'), transportController.createTransport);
router.put('/transports/:transportId',upload.single('photo'),authenticate, transportController.updateTransport);
router.delete('/transports/:transportId',authenticate, transportController.deleteTransport);

module.exports = router;
