const TransportBooking = require("../model/transportBookingSchema");
const Transport = require("../model/transportSchema");
const User = require("../../authService/model/userSchema");
const nodemailer = require("nodemailer");

const emailTemplates = require("./emailTemplates");
// const e = require("express");
// const approvalEmailTemplate = require("./approvalEmailTemplate");
// import { approvalEmailTemplate } from './approvalEmailTemplate';
// const fs = require('fs');

// transporter for sending email







const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.SENDER_EMAIL,
    pass: process.env.SENDER_PASSWORD,
  },
});


const createTransportBooking = async (req, res, next) => {
  try {
    const {
      userId,
      eventManager,
      department,
      institution,
      // eventName,
      eventDateType,
      eventDate,
      eventStartDate,
      eventEndDate,
      startTime,
      endTime,
      email,
      bookedTransportId,
      // bookedTransportName,
      vehicleType,
      selfOrGuest,
      noOfPerson,
      roundOrOneway,
    outstationOrLocal,
      naneOfGuest,
      mobNoOfGuest,

      pickupLocation,
      dropLocation,
    //   organizingClub,
      phoneNumber,
      hodEmail,
      remark,
      isApproved,
    } = req.body;

    // const transport = await Transport.findById(bookedTransportId);
    // if (!transport) {
    //   return res.status(422).json({ error: "Transport not found" });
    // }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(422).json({ error: "user not found" });
    }

    if (eventDateType === "full" && eventDateType === "half") {
      if (!eventDate) {
        return res.status(422).json({ error: "Please fill all details" });
      }
    } else if (eventDateType === "multiple") {
      if (!eventStartDate || !eventStartDate) {
        return res.status(422).json({ error: "Please fill all details" });
      }
    }

    const eventStartDateTime = new Date(eventStartDate);
    const eventEndDateTime = new Date(eventEndDate);

    if (eventEndDateTime <= eventStartDateTime) {
      return res
        .status(422)
        .json({ error: "Event end date should be after event start date" });
    }

    // Validate start and end time
    //  const startDateTime = new Date(`2000-01-01T${MainStartTime}:00Z`);
    //  const endDateTime = new Date(`2000-01-01T${MainEndTime}:00Z`);

    //  const startDateTime = new Date(startTime);
    //  const endDateTime = new Date(endTime);

    //  // Check if end time is after start time
    //  if (endDateTime <= startDateTime) {
    //    return res
    //      .status(422)
    //      .json({ error: "End time should be after start time" });
    //  }

    if (
      !eventManager ||
      !phoneNumber ||
      !department ||
      !institution ||
      !startTime ||
      !endTime ||
      !selfOrGuest ||
      
       !hodEmail ||
      // / !eventName ||
      // / !organizingClub ||
      !vehicleType ||
      !pickupLocation ||
      !dropLocation ||
      !noOfPerson || 
      // / !roundOrOneway   || 
    !outstationOrLocal
    ) {
      return res.status(422).json({ error: "Please fill all details" });
    }

    if (selfOrGuest === "guest") {
      // if (!naneOfGuest || !mobNoOfGuest) {
      //   return res.status(422).json({ error: "Please fill all details" });
      // } else 
      
      if (mobNoOfGuest.length !== 10) {
        return res.status(422).json({
          error: "Please enter a valid 10-digit phone number of Guest",
        });
      }
    }
    // Regular expression to validate full name with at least two words separated by a space

    const nameRegex =
      /^[\w'.]+\s[\w'.]+\s*[\w'.]*\s*[\w'.]*\s*[\w'.]*\s*[\w'.]*$/;

    if (!nameRegex.test(eventManager)) {
      return res
        .status(422)
        .json({ error: "Please enter your full Event Coordinator name" });
    }

    // Phone validation
    if (phoneNumber.length !== 10) {
      return res
        .status(422)
        .json({ error: "Please enter a valid 10-digit phone number" });
    }




    const emailRegex = /^\S+@\S+\.\S+$/;
  
    if (!emailRegex.test(hodEmail)) {
      return res.status(422).json({ error: "Kindly provide a valid email address." });
    }
    
    const acropolisEmailRegex = /@acropolis\.in$/;
    const acropolisEduEmailRegex = /@acropolis\.edu\.in$/;

    if (!acropolisEmailRegex.test(hodEmail) && !acropolisEduEmailRegex.test(hodEmail) ) {
      return res.status(422).json({ error: "Kindly provide a email address associated with Acropolis Institute" });
    }



    const booking = new TransportBooking({
      userId: user._id,
      institution,
      department,
      eventManager,
      // eventName,
      eventDateType,
      eventDate,
      eventStartDate,
      eventEndDate,
      startTime,
      endTime,
      email,
      bookedTransportId,
      // bookedTransport: transport,
      // bookedTransportName,
      vehicleType,
      
      selfOrGuest,
      noOfPerson,
      roundOrOneway,
    outstationOrLocal,
      naneOfGuest,
      mobNoOfGuest,
      pickupLocation,
      dropLocation,
    //   organizingClub,
      // eventDetailFile,
      // eventDetailText,
      phoneNumber,
      hodEmail,
      remark,
      isApproved,
    });
    // await booking.validate();
    // booking.bookedTransportId = transport;
    // await booking.populate(bookedTransportId);
    await booking.save();
    console.log(booking);


    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

    const StartDate = new Date(booking.eventStartDate).toLocaleDateString('en-GB', options);
    const EndDate = new Date(booking.eventEndDate).toLocaleDateString('en-GB', options);
    const MainDate = new Date(booking.eventDate).toLocaleDateString('en-GB', options);

    const MainStartTime = new Date(booking.startTime).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', hour12: true });
    const MainEndTime = new Date(booking.endTime).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', hour12: true });
    

    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      // to: transport.transportCreater, // Use the transport creator's email here
      to: process.env.ADMIN_EMAIL, // Use the transport creator's email here
      subject: "New Booking Request",
      html: emailTemplates.generateBookingEmailTemplate(
        // eventName,
        MainDate,
        selfOrGuest,
        noOfPerson,
        eventDateType,
        StartDate,
        EndDate,
        eventManager,
        MainStartTime,
        MainEndTime,
        // bookedTransportName,
        // transport.number,
      //   organizingClub,
        institution,
        department,
        booking._id
      ),
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
      } else {
        console.log("Email sent:", info.response);
      }
    });




   









    const hodEmailOptions = {
      from: process.env.SENDER_EMAIL,
      // to: transport.transportCreater, // Use the transport creator's email here
      to: hodEmail, // Use the transport creator's email here
      subject: "New Booking Request",
      html: emailTemplates.generateHodEmailTemplate(
        // eventName,
        MainDate,
        selfOrGuest,
        noOfPerson,
        eventDateType,
        StartDate,
        EndDate,
        eventManager,
        MainStartTime,
        MainEndTime,
        // bookedTransportName,
        // transport.number,
      //   organizingClub,
        institution,
        department,
        booking._id
      ),
    };

    transporter.sendMail(hodEmailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
      } else {
        console.log("Email sent:", info.response);
      }
    });




    res.status(201).json({ message: "Booking created successfully" });
  } catch (error) {
    next(error);
  }
};

const getTransportEvents = async (req, res, next) => {
  try {
    const bookings = await TransportBooking.find({
      isApproved: "Approved By Admin",
    }).populate("bookedTransportId");

    res.json({ bookings });
  } catch (error) {
    next(error);
  }
};

const getTransportBookings = async (req, res, next) => {
  try {
    const bookings = await TransportBooking.find()
      .populate("bookedTransportId")
      .populate("userId");

    res.json({ bookings });
  } catch (error) {
    next(error);
  }
};

const getTransportBookingById = async (req, res, next) => {
  // console.log("function called");

  try {
    const { bookingId } = req.params;
    const booking = await TransportBooking.findById(bookingId)
      .populate("bookedTransportId")
      .populate("userId");
    // console.log(booking);
    if (!booking) {
      return res.status(404).json({ error: "Booking not found" });
    }

    res.json({ booking });
  } catch (error) {
    next(error);
  }
};

const getTransportBookingByUserId = async (req, res, next) => {
  try {
    // const { userId } = req.params;
    const userId = req.rootUser._id;
    const booking = await TransportBooking.find({ userId })
      .populate("bookedTransportId")
      .populate("userId");
    // if (!mongoose.Types.ObjectId.isValid(userId)) {
    //   return res.status(400).json({ message: 'Invalid userId' });
    // }
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }
    res.json({ booking });
  } catch (error) {
    next(error);
  }
};

const getTransportBookingAdmin = async (req, res, next) => {
  try {
    let statusArray = [
      "Approved By HOD",
      "Approved By Admin",
      "Rejected By Admin",
    ];
    const adminEmail = req.rootUser.email;
    const userId = req.rootUser._id;
    // console.log("admin bookng");
    // console.log(adminEmail);
    if (process.env.REACT_APP_HOD_FEATURE != "true") {
      statusArray.unshift("Request Sent"); // Add "Request Sent" at the beginning if HOD feature is on
    }

    const bookings = await TransportBooking.find({
      isApproved: { $in: statusArray },
      $or: [
        { email: adminEmail },
        // Add other conditions as needed
        { "bookedTransport.transportCreater": adminEmail },
      ],
    })
      .populate("bookedTransportId")
      .populate("userId");
    // console.log(bookings);
    res.json({ bookings });
  } catch (error) {
    next(error);
  }
};

const getTransportBookingHod = async (req, res, next) => {
  const hodDepartment = req.rootUser.department;
  // console.log(hodDepartment);
  try {
    const bookings = await TransportBooking.find({
      department: hodDepartment,
    }).populate("bookedTransportId");

    res.json({ bookings });
  } catch (error) {
    next(error);
  }
};

const updateTransportBooking = async (req, res, next) => {
  try {
    const { bookingId } = req.params;
console.log(req.body)
    const {
      // eventManager,

      // eventName,
      eventDateType,
      eventStartDate,
      eventEndDate,
      eventDate,
      startTime,
      endTime,
      selfOrGuest,
      noOfPerson,
      roundOrOneway,
    outstationOrLocal,
      naneOfGuest,
      mobNoOfGuest,
      // nameOfDriver,
      // mobNoOfDriver,
      pickupLocation,
      dropLocation,
      // email,
      noOfVehicle,
      bookedTransportId,
      // bookedTransportName,
      vehicleType,
        hodEmail,
      // transportId,
      rejectionReason,
      remark,
      isApproved,
    } = req.body;
console.log("thois os bodyyyyyyyyyyyyy")
console.log(req.body);
    // const transport = await Transport.findById(bookedTransportId);
    // if (!transport) {
    //   return res.status(404).json({ message: 'Transport not found' });
    // }

    // if(isApproved === "Approved By Admin"){
    //   if(!nameOfDriver || !mobNoOfDriver){
    //     return res.status(422).json({ error: "Please fill all details" });
    //   } else if (mobNoOfDriver.length !== 10) {
    //     return res.status(422).json({ error: "Please enter a valid 10-digit phone number of Driver" });
    //   }
    // }

    const booking = await TransportBooking.findByIdAndUpdate(
      bookingId,
      {
        // eventName,
        eventDate,
        startTime,
        endTime,
        eventDateType,
        eventStartDate,
        eventEndDate,
        selfOrGuest,
        noOfPerson,
        roundOrOneway,
        outstationOrLocal,
        naneOfGuest,
        mobNoOfGuest,
        // nameOfDriver,
        // mobNoOfDriver,
        pickupLocation,
        dropLocation,
        bookedTransportId,
      // bookedTransportName,
      vehicleType,
      noOfVehicle,
        //  transportId: transport._id,email,
        isApproved,
        remark,
        rejectionReason,
      },
      { new: true }
    )
    .populate("bookedTransportId");

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    console.log(booking);

    // Send email based on the updated approval status

    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

    const StartDate = new Date(booking.eventStartDate).toLocaleDateString('en-GB', options);
     const EndDate = new Date(booking.eventEndDate).toLocaleDateString('en-GB', options);
    const MainDate = new Date(booking.eventDate).toLocaleDateString('en-GB', options);

    const MainStartTime = new Date(booking.startTime).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', hour12: true });
    const MainEndTime = new Date(booking.endTime).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', hour12: true });
    

    if (isApproved === "Request Sent" ) {
     
 
    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      // to: transport.transportCreater, // Use the transport creator's email here
      to: process.env.ADMIN_EMAIL, // Use the transport creator's email here
      subject: "Booking Request Updated",
      html: emailTemplates.generateBookingUpdatedEmailTemplate(
        // eventName,
        MainDate,
        selfOrGuest,
        noOfPerson,
        eventDateType,
        StartDate,
        EndDate,
        booking.eventManager,
        MainStartTime,
        MainEndTime,
        // bookedTransportName,
        // transport.number,
      //   organizingClub,
        booking.institution,
        booking.department,
        booking._id
      ),
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
      } else {
        console.log("Email sent:", info.response);
      }
    });




   









    const hodEmailOptions = {
      from: process.env.SENDER_EMAIL,
      // to: transport.transportCreater, // Use the transport creator's email here
      to: hodEmail, // Use the transport creator's email here
      subject: "Booking Request Updated",
      html: emailTemplates.generateHodUpdatedEmailTemplate(
        // eventName,
        MainDate,
        selfOrGuest,
        noOfPerson,
        eventDateType,
        StartDate,
        EndDate,
        booking.eventManager,
        MainStartTime,
        MainEndTime,
        // bookedTransportName,
        // transport.number,
      //   organizingClub,
        booking.institution,
        booking.department,
        booking._id
      ),
    };

    transporter.sendMail(hodEmailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
      } else {
        console.log("Email sent:", info.response);
      }
    });



    }

    

    // const StartTime = new Date(booking.startTime).toLocaleTimeString();
    // const EndTime = new Date(booking.endTime).toLocaleTimeString();
    if (isApproved === "Approved By Admin") {
      // Send email for approval
      sendApprovalEmail(booking, bookingId,MainStartTime,
        MainEndTime,MainDate,StartDate,EndDate);
    } else if (isApproved === "Rejected By Admin") {
      // Send email for rejection
      sendRejectionEmail(booking, bookingId, rejectionReason);
    }

    res.json({ message: "Booking updated successfully", booking });
  } catch (error) {
    next(error);
  }


};

const sendApprovalEmail = async (booking, bookingId,MainStartTime,
        MainEndTime,MainDate,StartDate,EndDate) => {


  try {
    console.log("this is send approveal email asdasdasdasddddddddddddd");
    console.log(booking);


const hodEmail = booking.hodEmail;


  const hodApprovalOptions = {
    from: process.env.SENDER_EMAIL,
    to: hodEmail,
    subject: "Booking Request Approved",
    html: emailTemplates.sendHodApprovalEmailTemplate(
      booking.bookedTransportId,
      booking.eventManager,
      booking.institution,
      booking.department,
      MainDate,
      booking.selfOrGuest,
      booking.noOfPerson,
      booking.eventDateType,
      StartDate,
      EndDate,
      MainStartTime,
        MainEndTime,
      bookingId
    ),
  };
  

    await transporter.sendMail(hodApprovalOptions);
  } catch (error) {
    console.log(error);
  }
  try {
    console.log("this is send approveal email asdasdasdasddddddddddddd");
    console.log(booking);


  
    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: process.env.SENDER_EMAIL, // Use the user's email associated with the booking
      subject: "Booking Request Approved",
      html: emailTemplates.sendApprovalEmailTemplate(
  
        booking.bookedTransportId,
        
        booking.institution,
        booking.department,
        MainDate,
        booking.selfOrGuest,
        booking.noOfPerson,
        booking.eventDateType,
        StartDate,
        EndDate,
        MainStartTime,
        MainEndTime,
        bookingId
      ),
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.log(error);
  }

};

const sendRejectionEmail = async (booking, bookingId, rejectionReason) => {
  try {
    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: process.env.SENDER_EMAIL, // Use the user's email associated with the booking
      subject: "Booking Request Rejected",
      html: emailTemplates.sendRejectionEmailTemplate(
        // booking.eventName,
        // booking.bookedTransportName,
//           booking.organizingClub,
booking.eventManager,
        booking.institution,
        booking.department,
        bookingId,
        rejectionReason
      ),
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Error sending email:", error);
  }




  try {
    console.log("this is send approveal email asdasdasdasddddddddddddd");
    console.log(booking);


const hodEmail = booking.hodEmail;


  const hodRejectionOptions = {
    from: process.env.SENDER_EMAIL,
    to: hodEmail,
    subject: "Booking Request Approved",
    html: emailTemplates.sendHodRejectionEmailTemplate(
      booking.eventManager,
      booking.institution,
      booking.department,
      bookingId,
      rejectionReason
    ),
  };
  

    await transporter.sendMail(hodRejectionOptions);
  } catch (error) {
    console.log(error);
  }

};







const deleteTransportBooking = async (req, res, next) => {
  try {
    const { bookingId } = req.params;
    const booking = await TransportBooking.findByIdAndDelete(bookingId);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }
    res.json({ message: "Booking deleted successfully" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createTransportBooking,
  getTransportBookings,
  getTransportBookingById,
  updateTransportBooking,
  deleteTransportBooking,
  getTransportBookingByUserId,
  getTransportEvents,
  getTransportBookingAdmin,
  getTransportBookingHod,
};
