const express = require('express');
const router = express.Router();
const multer = require("multer");

const canteenController = require('../controllers/canteenController');
const authenticate = require("../../authService/middleware/authenticate");




// Set up multer storage for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "uploads/canteen"); // Directory to save uploaded files
    },
    filename: function (req, file, cb) {
      cb(null, `${Date.now()}-${file.originalname}`); // Use the original file name
    },
  });
  const upload = multer({ storage: storage });

router.get('/canteens', canteenController.getCanteens);
router.get('/canteens/:canteenId',authenticate, canteenController.getCanteenById);
router.post('/canteens',authenticate,upload.single('photo'), canteenController.createCanteen);
router.put('/canteens/:canteenId',authenticate,upload.single('photo'), canteenController.updateCanteen);
router.delete('/canteens/:canteenId',authenticate, canteenController.deleteCanteen);

module.exports = router;
