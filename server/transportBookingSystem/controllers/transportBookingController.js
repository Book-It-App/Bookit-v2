const TransportBooking = require("../model/transportBookingSchema");
const Transport = require("../model/transportSchema");
const User = require("../../authService/model/userSchema");
const nodemailer = require("nodemailer");
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

const generateBookingEmailTemplate = (
  // eventName,
  MainDate,
  selfOrGuest,
  noOfPerson,
  
  eventDateType,
  StartDate,
  EndDate,
  // bookedTransportName,
  // bookedTransportNumber,
//   organizingClub,
  institution,
  department,
  bookingId
) => {
  return `

  <head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
  <link href="https://fonts.googleapis.com/css2?family=Roboto&display=swap" rel="stylesheet">
  <style>
      a,
      a:link,
      a:visited {
          text-decoration: none;
          color: #00788a;
      }

      a:hover {
          text-decoration: underline;
      }

      h2,
      h2 a,
      h2 a:visited,
      h3,
      h3 a,
      h3 a:visited,
      h4,
      h5,
      h6,
      .t_cht {
          color: #000 !important;
      }

      .ExternalClass p,
      .ExternalClass span,
      .ExternalClass font,
      .ExternalClass td {
          line-height: 100%;
      }

      .ExternalClass {
          width: 100%;
      }
  </style>
</head>

<body style="font-size: 1.25rem;font-family: 'Roboto', sans-serif;padding-left:20px;padding-right:20px;padding-top:20px;padding-bottom:20px; background-color: #FAFAFA; width: 75%; max-width: 1280px; min-width: 600px; margin-right: auto; margin-left: auto">
  <table cellpadding="12" cellspacing="0" width="100%" bgcolor="#FAFAFA" style="border-collapse: collapse;margin: auto">
      <tbody>
          <tr>
              <td style="padding: 50px; background-color: #fff; max-width: 660px">
                  <table style="width: 100%;">
                      <tr>
                          <td style="text-align:center">
                             <h1 style="font-size: 30px; color: #4f46e5; margin-top: 0;">New Transport Booking Request</h1> 
          <h1 style="font-size: 30px; color: #202225; margin-top: 0;">Hello Admin</h1>
            <p style="font-size: 18px; margin-bottom: 30px; color: #202225; max-width: 60ch; margin-left: auto; margin-right: auto">A new booking has been requested on our platform. Please review the booking details provided below and click the button to view the booking.</p>     
                            
             
                        
                          <table style="width: 100%;" >
                      <tr>
                          
                              <h1 style="font-size: 25px;text-align: left; color: #202225; margin-top: 0;">Booking Details</h1>
                              <table style="width: 100%;" >
                                 
                           
                                 
                                        <tr>
                                      <td style="font-size: 20px; color: #202225; margin-top: 0; text-align: left;width:50%;">Institution :</td>
                                      <td style="font-size: 20px; color: #202225; margin-top: 0; text-align: left;width:50%;"> ${institution}</td>
                                  </tr>
                                    <tr>
                                      <td style="font-size: 20px; color: #202225; margin-top: 0; text-align: left;width:50%;">Departmant :</td>
                                      <td style="font-size: 20px; color: #202225; margin-top: 0; text-align: left;width:50%;"> ${department}</td>
                                  </tr>
                                    ${eventDateType === "full" || eventDateType === "half" ? `
                                    <tr>
                                    <td style="font-size: 20px; color: #202225; margin-top: 0; text-align: left;width:50%;">Date:</td>
                                    <td style="font-size: 20px; color: #202225; margin-top: 0; text-align: left;width:50%;"> ${MainDate}</td>
                                    </tr>`
                                    :
                                    `
                                            <tr>
                                            <td style="font-size: 20px; color: #202225; margin-top: 0; text-align: left;width:50%;">From:</td>
                                            <td style="font-size: 20px; color: #202225; margin-top: 0; text-align: left;width:50%;"> ${StartDate}</td>
                                        </tr>

                                        <tr>
                                        <td style="font-size: 20px; color: #202225; margin-top: 0; text-align: left;width:50%;">To:</td>
                                        <td style="font-size: 20px; color: #202225; margin-top: 0; text-align: left;width:50%;"> ${EndDate}</td>
                                    </tr>

                                    `} 
                                        <tr>
                                      <td style="font-size: 20px; color: #202225; margin-top: 0; text-align: left;width:50%;">Self / Guest :</td>
                                      <td style="font-size: 20px; color: #202225; margin-top: 0; text-align: left;width:50%;"> ${selfOrGuest}</td>
                                  </tr>
                                          <tr>
                                      <td style="font-size: 20px; color: #202225; margin-top: 0; text-align: left;width:50%;">No. Of Person :</td>
                                      <td style="font-size: 20px; color: #202225; margin-top: 0; text-align: left;width:50%;"> ${noOfPerson}</td>
                                  </tr>
                                
                              </table>

                          </td>
                      </tr>
                                
                  </table>
              </td>
          </tr>
          <br/>
          <center>  <a href="${process.env.CLIENT_URL}/transport-booking-system/bookingsView/${bookingId}"  style=" background-color: #4f46e5; color: #fff; padding: 8px 24px;  border-radius: 8px; border-style: solid; border-color: #4f46e5; font-size: 14px; text-decoration: none; cursor: pointer">View Booking</a></center>
      </tbody>
                 
  </table>
</body>




  `;
};




const generateHodEmailTemplate = (
  // eventName,
  MainDate,
  selfOrGuest,
  noOfPerson,
  
  eventDateType,
  StartDate,
  EndDate,
  // bookedTransportName,
  // bookedTransportNumber,
//   organizingClub,
  institution,
  department,
  bookingId
) => {
  return `

  <head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
  <link href="https://fonts.googleapis.com/css2?family=Roboto&display=swap" rel="stylesheet">
  <style>
      a,
      a:link,
      a:visited {
          text-decoration: none;
          color: #00788a;
      }

      a:hover {
          text-decoration: underline;
      }

      h2,
      h2 a,
      h2 a:visited,
      h3,
      h3 a,
      h3 a:visited,
      h4,
      h5,
      h6,
      .t_cht {
          color: #000 !important;
      }

      .ExternalClass p,
      .ExternalClass span,
      .ExternalClass font,
      .ExternalClass td {
          line-height: 100%;
      }

      .ExternalClass {
          width: 100%;
      }
  </style>
</head>

<body style="font-size: 1.25rem;font-family: 'Roboto', sans-serif;padding-left:20px;padding-right:20px;padding-top:20px;padding-bottom:20px; background-color: #FAFAFA; width: 75%; max-width: 1280px; min-width: 600px; margin-right: auto; margin-left: auto">
  <table cellpadding="12" cellspacing="0" width="100%" bgcolor="#FAFAFA" style="border-collapse: collapse;margin: auto">
      <tbody>
          <tr>
              <td style="padding: 50px; background-color: #fff; max-width: 660px">
                  <table style="width: 100%;">
                      <tr>
                          <td style="text-align:center">
                             <h1 style="font-size: 30px; color: #4f46e5; margin-top: 0;">New Transport Booking Request</h1> 
          <h1 style="font-size: 30px; color: #202225; margin-top: 0;">Hello</h1>
            <p style="font-size: 18px; margin-bottom: 30px; color: #202225; max-width: 60ch; margin-left: auto; margin-right: auto">A new booking has been requested from your Department. Please review the booking details provided below and click the button to view the booking.</p>     

                          <table style="width: 100%;" >
                      <tr>
                          
                              <h1 style="font-size: 25px;text-align: left; color: #202225; margin-top: 0;">Booking Details</h1>
                              <table style="width: 100%;" >
                                 
                           
                                 
                                        <tr>
                                      <td style="font-size: 20px; color: #202225; margin-top: 0; text-align: left;width:50%;">Institution :</td>
                                      <td style="font-size: 20px; color: #202225; margin-top: 0; text-align: left;width:50%;"> ${institution}</td>
                                  </tr>
                                    <tr>
                                      <td style="font-size: 20px; color: #202225; margin-top: 0; text-align: left;width:50%;">Departmant :</td>
                                      <td style="font-size: 20px; color: #202225; margin-top: 0; text-align: left;width:50%;"> ${department}</td>
                                  </tr>
                                    ${eventDateType === "full" || eventDateType === "half" ? `
                                    <tr>
                                    <td style="font-size: 20px; color: #202225; margin-top: 0; text-align: left;width:50%;">Date:</td>
                                    <td style="font-size: 20px; color: #202225; margin-top: 0; text-align: left;width:50%;"> ${MainDate}</td>
                                    </tr>`
                                    :
                                    `
                                            <tr>
                                            <td style="font-size: 20px; color: #202225; margin-top: 0; text-align: left;width:50%;">From:</td>
                                            <td style="font-size: 20px; color: #202225; margin-top: 0; text-align: left;width:50%;"> ${StartDate}</td>
                                        </tr>

                                        <tr>
                                        <td style="font-size: 20px; color: #202225; margin-top: 0; text-align: left;width:50%;">To:</td>
                                        <td style="font-size: 20px; color: #202225; margin-top: 0; text-align: left;width:50%;"> ${EndDate}</td>
                                    </tr>

                                    `} 
                                        <tr>
                                      <td style="font-size: 20px; color: #202225; margin-top: 0; text-align: left;width:50%;">Self / Guest :</td>
                                      <td style="font-size: 20px; color: #202225; margin-top: 0; text-align: left;width:50%;"> ${selfOrGuest}</td>
                                  </tr>
                                          <tr>
                                      <td style="font-size: 20px; color: #202225; margin-top: 0; text-align: left;width:50%;">No. Of Person :</td>
                                      <td style="font-size: 20px; color: #202225; margin-top: 0; text-align: left;width:50%;"> ${noOfPerson}</td>
                                  </tr>
                                
                              </table>

                          </td>
                      </tr>
                                
                  </table>
              </td>
          </tr>
          <br/>
          <center>  <a href="${process.env.CLIENT_URL}/transport-booking-system/bookingsView/${bookingId}"  style=" background-color: #4f46e5; color: #fff; padding: 8px 24px;  border-radius: 8px; border-style: solid; border-color: #4f46e5; font-size: 14px; text-decoration: none; cursor: pointer">View Booking</a></center>
      </tbody>
                 
  </table>
</body>




  `;
};



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
    //  const startDateTime = new Date(`2000-01-01T${startTime}:00Z`);
    //  const endDateTime = new Date(`2000-01-01T${endTime}:00Z`);

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

    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      // to: transport.transportCreater, // Use the transport creator's email here
      to: process.env.ADMIN_EMAIL, // Use the transport creator's email here
      subject: "New Booking Request",
      html: generateBookingEmailTemplate(
        // eventName,
        MainDate,
        selfOrGuest,
        noOfPerson,
        eventDateType,
        StartDate,
        EndDate,
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
      html: generateHodEmailTemplate(
        // eventName,
        MainDate,
        selfOrGuest,
        noOfPerson,
        eventDateType,
        StartDate,
        EndDate,
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
    
    // const StartTime = new Date(booking.startTime).toLocaleTimeString();
    // const EndTime = new Date(booking.endTime).toLocaleTimeString();
    if (isApproved === "Approved By Admin") {
      // Send email for approval
      sendApprovalEmail(booking, bookingId,MainDate,StartDate,EndDate);
    } else if (isApproved === "Rejected By Admin") {
      // Send email for rejection
      sendRejectionEmail(booking, bookingId, rejectionReason);
    }

    res.json({ message: "Booking updated successfully", booking });
  } catch (error) {
    next(error);
  }


};

const sendApprovalEmail = async (booking, bookingId,MainDate,StartDate,EndDate) => {
  try {
    console.log("this is send approveal email asdasdasdasddddddddddddd");
    console.log(booking);



// const approvalEmail = approvalEmailTemplate(booking.nameOfDriver,
  // booking.mobNoOfDriver,
  // booking.bookedTransportName,
  // booking.bookedTransport.number,
  // booking.bookedTransport.capacity,

  // booking.institution,
  // booking.department,
  // MainDate,
  // booking.selfOrGuest,
  // booking.noOfPerson,
  // booking.eventDateType,
  // StartDate,
  // EndDate,
  // bookingId);


    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: process.env.SENDER_EMAIL, // Use the user's email associated with the booking
      subject: "Booking Request Approved",
      html: sendApprovalEmailTemplate(
        
        booking.nameOfDriver,
        booking.mobNoOfDriver,
        booking.bookedTransportId[0].name,
        booking.bookedTransportId[0].number,
        booking.bookedTransportId[0].transportType,
        // booking.bookedTransport.photo,
        // booking.eventName,
//           booking.organizingClub,
        booking.institution,
        booking.department,
        MainDate,
        booking.selfOrGuest,
        booking.noOfPerson,
        booking.eventDateType,
        StartDate,
        EndDate,
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
      html: sendRejectionEmailTemplate(
        // booking.eventName,
        // booking.bookedTransportName,
//           booking.organizingClub,
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
};

const sendRejectionEmailTemplate = (
  // eventName,
  // bookedTransportName,
//   organizingClub,
  institution,
  department,
  bookingId,
  rejectionReason
) => {
  return `
    

  <head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
  <link href="https://fonts.googleapis.com/css2?family=Roboto&display=swap" rel="stylesheet">
  <style>
      a,
      a:link,
      a:visited {
          text-decoration: none;
          color: #00788a;
      }

      a:hover {
          text-decoration: underline;
      }

      h2,
      h2 a,
      h2 a:visited,
      h3,
      h3 a,
      h3 a:visited,
      h4,
      h5,
      h6,
      .t_cht {
          color: #000 !important;
      }

      .ExternalClass p,
      .ExternalClass span,
      .ExternalClass font,
      .ExternalClass td {
          line-height: 100%;
      }

      .ExternalClass {
          width: 100%;
      }
  </style>
</head>

<body style="font-size: 1.25rem;font-family: 'Roboto', sans-serif;padding-left:20px;padding-right:20px;padding-top:20px;padding-bottom:20px; background-color: #FAFAFA; width: 75%; max-width: 1280px; min-width: 600px; margin-right: auto; margin-left: auto">
  <table cellpadding="12" cellspacing="0" width="100%" bgcolor="#FAFAFA" style="border-collapse: collapse;margin: auto">
      <tbody>
          <tr>
              <td style="padding: 50px; background-color: #fff; max-width: 660px">
                  <table style="width: 100%;">
                      <tr>
                          <td style="text-align:center">
                                <h1 style="font-size: 30px; color: #ef4444; margin-top: 0;">Booking Request Rejected</h1>
                
                <h1 style="font-size: 30px; color: #202225; margin-top: 0;">Hello User</h1>
                <p style="font-size: 18px; margin-bottom: 30px; color: #202225; max-width: 60ch; margin-left: auto; margin-right: auto">Your booking request has been rejected due to following reason. Please review the booking details provided below and click the button below to view the booking.</p>
                  <h1 style="font-size: 25px;text-align: left; color: #202225; margin-top: 0;">Reason for Rejection</h1>
                <p style="font-size: 18px; margin-bottom: 30px; color: #202225; max-width: 60ch; text-align: left;">${rejectionReason}</p>
                        
                          <table style="width: 100%;" >
                      <tr>
                          
                              <h1 style="font-size: 25px;text-align: left; color: #202225; margin-top: 0;">Booking Details</h1>
                              <table style="width: 100%;" >
                                 
                                  
                                 
                                        <tr>
                                      <td style="font-size: 20px; color: #202225; margin-top: 0; text-align: left;width:50%;">Institution :</td>
                                      <td style="font-size: 20px; color: #202225; margin-top: 0; text-align: left;width:50%;"> ${institution}</td>
                                  </tr>
                                    <tr>
                                      <td style="font-size: 20px; color: #202225; margin-top: 0; text-align: left;width:50%;">Departmant :</td>
                                      <td style="font-size: 20px; color: #202225; margin-top: 0; text-align: left;width:50%;"> ${department}</td>
                                  </tr>

 
                             
                              </table>

                          </td>
                      </tr>
                                
                  </table>
              </td>
          </tr>
          <br/>
          <center>  <a href="${process.env.CLIENT_URL}/transport-booking-system/bookingsView/${bookingId}"  style=" background-color: #4f46e5; color: #fff; padding: 8px 24px;  border-radius: 8px; border-style: solid; border-color: #4f46e5; font-size: 14px; text-decoration: none; cursor: pointer">View Booking</a></center>
      </tbody>
                 
  </table>
</body>


  
      `;
};












// const sendApprovalEmailTemplate = ({
//   nameOfDriver,
//   mobNoOfDriver,
//   bookedTransportName,
//   bookedTransport,
//   eventName,
//   organizingClub,
//   institution,
//   department,
//   mainDate,
//   selfOrGuest,
//   noOfPerson,
//   eventDateType,
//   startDate,
//   endDate,
//   bookingId,
// }) => {
//   try {
//     // Read the content of the HTML file
//     const htmlContent = fs.readFileSync('/server/transportBookingSystem/controllers/approvalEmailTemplate.html', 'utf8');

//     // Replace placeholders with actual values
//     const replacedContent = htmlContent
//     .replace('${CLIENT_URL}', process.env.CLIENT_URL)
//     .replace('${BOOKING_ID}', bookingId)
//     .replace('${NAME_OF_DRIVER}', nameOfDriver)
//     .replace('${MOB_NO_OF_DRIVER}', mobNoOfDriver)
//     .replace('${BOOKED_TRANSPORT_NAME}', bookedTransportName)
//     .replace('${BOOKED_TRANSPORT_NUMBER}', bookedTransport.number)
//     .replace('${BOOKED_TRANSPORT_CAPACITY}', bookedTransport.capacity)
//     .replace('${EVENT_NAME}', eventName)
//     .replace('${ORGANIZING_CLUB}', organizingClub)
//     .replace('${Institution}', institution)
//     .replace('${Departmant}', department)
//     .replace('${MAIN_DATE}', mainDate)
//     .replace('${SELF_OR_GUEST}', selfOrGuest)
//     .replace('${NO_OF_PERSON}', noOfPerson)
//     .replace('${EVENT_DATE_TYPE}', eventDateType)
//     .replace('${START_DATE}', startDate)
//     .replace('${END_DATE}', endDate);

//     return replacedContent;
//   } catch (error) {
//     console.log(error);
//     return ''; // Return an empty string or handle the error as needed
//   }
// };




const sendApprovalEmailTemplate = (
  nameOfDriver,
  mobNoOfDriver,
  bookedTransportName,
  bookedTransportNumber,
  bookedTransportTransportType,
  // bookedTransportPhoto,
  // eventName,
//   organizingClub,
  institution,
  department,
  eventDate,
  selfOrGuest,
  noOfPerson,
  eventDateType,
  eventStartDate,
  eventEndDate,
  bookingId
) => {
  return `
  <head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
  <link href="https://fonts.googleapis.com/css2?family=Roboto&display=swap" rel="stylesheet">
  <style>
      a,
      a:link,
      a:visited {
          text-decoration: none;
          color: #00788a;
      }

      a:hover {
          text-decoration: underline;
      }

      h2,
      h2 a,
      h2 a:visited,
      h3,
      h3 a,
      h3 a:visited,
      h4,
      h5,
      h6,
      .t_cht {
          color: #000 !important;
      }

      .ExternalClass p,
      .ExternalClass span,
      .ExternalClass font,
      .ExternalClass td {
          line-height: 100%;
      }

      .ExternalClass {
          width: 100%;
      }
  </style>
</head>

<body style="font-size: 1.25rem;font-family: 'Roboto', sans-serif;padding-left:20px;padding-right:20px;padding-top:20px;padding-bottom:20px; background-color: #FAFAFA; width: 75%; max-width: 1280px; min-width: 600px; margin-right: auto; margin-left: auto">
  <table cellpadding="12" cellspacing="0" width="100%" bgcolor="#FAFAFA" style="border-collapse: collapse;margin: auto">
      <tbody>
          <tr>
              <td style="padding: 50px; background-color: #fff; max-width: 660px">
                  <table style="width: 100%;">
                      <tr>
                          <td style="text-align:center">
                              <h1 style="font-size: 30px; color: #16a34a; margin-top: 0;">Booking Request Approved</h1>
                              <h1 style="font-size: 30px; color: #202225; margin-top: 0;">Hello User</h1>
                              <p style="font-size: 18px; margin-bottom: 30px; color: #202225; max-width: 60ch; margin-left: auto; margin-right: auto">Your booking request has been approved. Please review the booking details provided below and click the button below to view the booking.</p>
                              <h1 style="font-size: 25px;text-align: left; color: #202225; margin-top: 0;">Driver Details</h1>
                              <table style="width: 100%;" >
                                  <tr>
                                      <td style="font-size: 20px; color: #202225; margin-top: 0; text-align: left;width:50%; width:50%;">Driver Name:</td>
                                      <td style="font-size: 20px; color: #202225; margin-top: 0; text-align: left;width:50%; width:50%;">${nameOfDriver}</td>
                                  </tr>
                                  <tr>
                                      <td style="font-size: 20px; color: #202225; margin-top: 0; text-align: left;width:50%;">Mobile No.:</td>
                                      <td style="font-size: 20px; color: #202225; margin-top: 0; text-align: left;width:50%;">${mobNoOfDriver}</td>
                                  </tr>
                              </table>
                            
                            
                                  
                              <table style="width: 100%;">
                      <tr>
                          <br>
                              <h1 style="font-size: 25px;text-align: left; color: #202225; margin-top: 0;">Transport Details</h1>
                              <table style="width: 100%;" >
                                  <tr>
                                      <td style="font-size: 20px; color: #202225; margin-top: 0; text-align: left;width:50%;">Vehicle Name:</td>
                                      <td style="font-size: 20px; color: #202225; margin-top: 0; text-align: left;width:50%;">${bookedTransportName}</td>
                                  </tr>
                                  <tr>
                                      <td style="font-size: 20px; color: #202225; margin-top: 0; text-align: left;width:50%;">Vehicle Number:</td>
                                      <td style="font-size: 20px; color: #202225; margin-top: 0; text-align: left;width:50%;"> ${bookedTransportNumber}</td>
                                  </tr>
                              <tr>
                                      <td style="font-size: 20px; color: #202225; margin-top: 0; text-align: left;width:50%;">Vehicle Type:</td>
                                      <td style="font-size: 20px; color: #202225; margin-top: 0;  text-transform: capitalize; text-align: left;width:50%;"> ${bookedTransportTransportType}</td>
                                  </tr>
                                
                              </table>
                        <br>
                          <table style="width: 100%;" >
                      <tr>
                          
                              <h1 style="font-size: 25px;text-align: left; color: #202225; margin-top: 0;">Booking Details</h1>
                              <table style="width: 100%;" >
                                 
                                 
                                        <tr>
                                      <td style="font-size: 20px; color: #202225; margin-top: 0; text-align: left;width:50%;">Institution :</td>
                                      <td style="font-size: 20px; color: #202225; margin-top: 0; text-align: left;width:50%;"> ${institution}</td>
                                  </tr>
                                    <tr>
                                      <td style="font-size: 20px; color: #202225; margin-top: 0; text-align: left;width:50%;">Departmant :</td>
                                      <td style="font-size: 20px; color: #202225; margin-top: 0; text-align: left;width:50%;"> ${department}</td>
                                  </tr>
                                  ${eventDateType === "full" || eventDateType === "half" ? `
                                    <tr>
                                    <td style="font-size: 20px; color: #202225; margin-top: 0; text-align: left;width:50%;">Date:</td>
                                    <td style="font-size: 20px; color: #202225; margin-top: 0; text-align: left;width:50%;"> ${eventDate}</td>
                                    </tr>`
                                    :
                                    `
                                            <tr>
                                            <td style="font-size: 20px; color: #202225; margin-top: 0; text-align: left;width:50%;">From:</td>
                                            <td style="font-size: 20px; color: #202225; margin-top: 0; text-align: left;width:50%;"> ${eventStartDate}</td>
                                        </tr>

                                        <tr>
                                        <td style="font-size: 20px; color: #202225; margin-top: 0; text-align: left;width:50%;">To:</td>
                                        <td style="font-size: 20px; color: #202225; margin-top: 0; text-align: left;width:50%;"> ${eventEndDate}</td>
                                    </tr>

                                    `} 
                                        <tr>
                                      <td style="font-size: 20px; color: #202225; margin-top: 0; text-align: left;width:50%;">Self / Guest :</td>
                                      <td style="font-size: 20px; color: #202225; margin-top: 0; text-align: left;width:50%;"> ${selfOrGuest}</td>
                                  </tr>
                                          <tr>
                                      <td style="font-size: 20px; color: #202225; margin-top: 0; text-align: left;width:50%;">No. Of Person :</td>
                                      <td style="font-size: 20px; color: #202225; margin-top: 0; text-align: left;width:50%;"> ${noOfPerson}</td>
                                  </tr>
                                
                              </table>

                          </td>
                      </tr>
                                
                  </table>
              </td>
          </tr>
          <br/>
          <center>  <a href="${process.env.CLIENT_URL}/transport-booking-system/bookingsView/${bookingId}"  style=" background-color: #4f46e5; color: #fff; padding: 8px 24px;  border-radius: 8px; border-style: solid; border-color: #4f46e5; font-size: 14px; text-decoration: none; cursor: pointer">View Booking</a></center>
      </tbody>
                 
  </table>
</body>


  
  
      `;
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
