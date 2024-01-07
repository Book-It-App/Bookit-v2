const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
// const connectDB = require("./DB/conn");
const cookieParser = require("cookie-parser");
const app = express();
app.use(cookieParser());





app.use(
  cors({
    credentials: true,
    origin: true,
  })
);

app.set("trust proxy", 1);

app.use(express.json());

dotenv.config({ path: "./.env" });





const connectDB = require("./DB/conn");

const hallBookingRoutes = require('./hallBookingSystem/router/hallBookingRoutes');
const hallRoutes = require('./hallBookingSystem/router/hallRoutes');

const transportBookingRoutes = require('./transportBookingSystem/router/transportBookingRoutes');
const transportRoutes = require('./transportBookingSystem/router/transportRoutes');

// const canteenBookingRoutes = require('./canteenBookingSystem/router/canteenBookingRoutes');

app.use('/hall-booking-system', hallBookingRoutes);
app.use('/hall-booking-system', hallRoutes);
app.use('/transport-booking-system', transportBookingRoutes);
app.use('/transport-booking-system', transportRoutes);
// app.use('/canteen-booking-system', canteenBookingRoutes);


require("./authService/model/userSchema");
require("./hallBookingSystem/model/hallSchema");
require("./hallBookingSystem/model/hallBookingSchema");

// require("./transportBookingSystem/model/transportSchema");
// require("./transportBookingSystem/model/transportBookingSchema");

app.use(require("./authService/router/authRoutes"));
// app.use(require("./hallBookingSystem/router/hallBookingRoutes"));
// app.use(require("./hallBookingSystem/router/hallRoutes"));

// app.use(require("./transportBookingSystem/router/transportBookingRoutes"));
// app.use(require("./transportBookingSystem/router/transportRoutes"));

connectDB();

const PORT = process.env.PORT;

app.listen(PORT, () => {
  // console.log("Server is running on port",PORT);
});
