
const generateBookingEmailTemplate = (
    // eventName,
    MainDate,
    selfOrGuest,
    noOfPerson,
    
    eventDateType,
    StartDate,
    EndDate,
    eventManager, MainStartTime,
          MainEndTime,
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
                                <td style="font-size: 20px; color: #202225; margin-top: 0; text-align: left;width:50%;">Booking Faculty/Staff :</td>
                                <td style="font-size: 20px; color: #202225; margin-top: 0; text-align: left;width:50%;"> ${eventManager}</td>
                            </tr>
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
                                      <td style="font-size: 20px; color: #202225; margin-top: 0; text-align: left;width:50%;">Start Time:</td>
                                      <td style="font-size: 20px; color: #202225; margin-top: 0; text-align: left;width:50%;"> ${MainStartTime}</td>
                                  </tr>
  
                                  <tr>
                                  <td style="font-size: 20px; color: #202225; margin-top: 0; text-align: left;width:50%;">End Time:</td>
                                  <td style="font-size: 20px; color: #202225; margin-top: 0; text-align: left;width:50%;"> ${MainEndTime}</td>
                              </tr>
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
    eventManager, MainStartTime,
          MainEndTime,
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
              <p style="font-size: 18px; margin-bottom: 30px; color: #202225; max-width: 60ch; margin-left: auto; margin-right: auto">A new transport booking has been requested from your Department. Please review the booking details provided below and click the button to view the booking.</p>     
  
                            <table style="width: 100%;" >
                        <tr>
                            
                                <h1 style="font-size: 25px;text-align: left; color: #202225; margin-top: 0;">Booking Details</h1>
                                <table style="width: 100%;" >
                                   
                             
                                <tr>
                                <td style="font-size: 20px; color: #202225; margin-top: 0; text-align: left;width:50%;">Booking Faculty/Staff :</td>
                                <td style="font-size: 20px; color: #202225; margin-top: 0; text-align: left;width:50%;"> ${eventManager}</td>
                            </tr>
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
                                      <td style="font-size: 20px; color: #202225; margin-top: 0; text-align: left;width:50%;">Start Time:</td>
                                      <td style="font-size: 20px; color: #202225; margin-top: 0; text-align: left;width:50%;"> ${MainStartTime}</td>
                                  </tr>
  
                                  <tr>
                                  <td style="font-size: 20px; color: #202225; margin-top: 0; text-align: left;width:50%;">End Time:</td>
                                  <td style="font-size: 20px; color: #202225; margin-top: 0; text-align: left;width:50%;"> ${MainEndTime}</td>
                              </tr>
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
  
  
  const generateBookingUpdatedEmailTemplate = (
    // eventName,
    MainDate,
    selfOrGuest,
    noOfPerson,
    
    eventDateType,
    StartDate,
    EndDate,
    eventManager, MainStartTime,
          MainEndTime,
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
                               <h1 style="font-size: 30px; color: #4f46e5; margin-top: 0;">Transport Booking Request Updated</h1> 
            <h1 style="font-size: 30px; color: #202225; margin-top: 0;">Hello Admin</h1>
              <p style="font-size: 18px; margin-bottom: 30px; color: #202225; max-width: 60ch; margin-left: auto; margin-right: auto">A booking request has been updated on our platform. Please review the booking details provided below and click the button to view the booking.</p>     
                              
               
                          
                            <table style="width: 100%;" >
                        <tr>
                            
                                <h1 style="font-size: 25px;text-align: left; color: #202225; margin-top: 0;">Booking Details</h1>
                                <table style="width: 100%;" >
                                   
                             
                                <tr>
                                <td style="font-size: 20px; color: #202225; margin-top: 0; text-align: left;width:50%;">Booking Faculty/Staff :</td>
                                <td style="font-size: 20px; color: #202225; margin-top: 0; text-align: left;width:50%;"> ${eventManager}</td>
                            </tr>
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
                                      <td style="font-size: 20px; color: #202225; margin-top: 0; text-align: left;width:50%;">Start Time:</td>
                                      <td style="font-size: 20px; color: #202225; margin-top: 0; text-align: left;width:50%;"> ${MainStartTime}</td>
                                  </tr>
  
                                  <tr>
                                  <td style="font-size: 20px; color: #202225; margin-top: 0; text-align: left;width:50%;">End Time:</td>
                                  <td style="font-size: 20px; color: #202225; margin-top: 0; text-align: left;width:50%;"> ${MainEndTime}</td>
                              </tr>
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
  
  
  
  
  const generateHodUpdatedEmailTemplate = (
    // eventName,
    MainDate,
    selfOrGuest,
    noOfPerson,
    
    eventDateType,
    StartDate,
    EndDate,
    eventManager, MainStartTime,
          MainEndTime,
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
                               <h1 style="font-size: 30px; color: #4f46e5; margin-top: 0;">Transport Booking Request Updated</h1> 
            <h1 style="font-size: 30px; color: #202225; margin-top: 0;">Hello</h1>
              <p style="font-size: 18px; margin-bottom: 30px; color: #202225; max-width: 60ch; margin-left: auto; margin-right: auto">A transport booking request has been updated from your Department. Please review the booking details provided below and click the button to view the booking.</p>     
  
                            <table style="width: 100%;" >
                        <tr>
                            
                                <h1 style="font-size: 25px;text-align: left; color: #202225; margin-top: 0;">Booking Details</h1>
                                <table style="width: 100%;" >
                                   
                             
                                <tr>
                                <td style="font-size: 20px; color: #202225; margin-top: 0; text-align: left;width:50%;">Booking Faculty/Staff :</td>
                                <td style="font-size: 20px; color: #202225; margin-top: 0; text-align: left;width:50%;"> ${eventManager}</td>
                            </tr>
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
                                      <td style="font-size: 20px; color: #202225; margin-top: 0; text-align: left;width:50%;">Start Time:</td>
                                      <td style="font-size: 20px; color: #202225; margin-top: 0; text-align: left;width:50%;"> ${MainStartTime}</td>
                                  </tr>
  
                                  <tr>
                                  <td style="font-size: 20px; color: #202225; margin-top: 0; text-align: left;width:50%;">End Time:</td>
                                  <td style="font-size: 20px; color: #202225; margin-top: 0; text-align: left;width:50%;"> ${MainEndTime}</td>
                              </tr>
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
  




  
const sendRejectionEmailTemplate = (
    // eventName,
    // bookedTransportName,
  //   organizingClub,
  eventManager,
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
                  <p style="font-size: 18px; margin-bottom: 30px; color: #202225; max-width: 60ch; margin-left: auto; margin-right: auto">Your transport booking request has been rejected due to following reason. Please review the booking details provided below and click the button below to view the booking.</p>
                    <h1 style="font-size: 25px;text-align: left; color: #202225; margin-top: 0;">Reason for Rejection</h1>
                  <p style="font-size: 18px; margin-bottom: 30px; color: #202225; max-width: 60ch; text-align: left;">${rejectionReason}</p>
                          
                            <table style="width: 100%;" >
                        <tr>
                            
                                <h1 style="font-size: 25px;text-align: left; color: #202225; margin-top: 0;">Booking Details</h1>
                                <table style="width: 100%;" >
                                   
                                <tr>
                                <td style="font-size: 20px; color: #202225; margin-top: 0; text-align: left;width:50%;">Booking Faculty/Staff :</td>
                                <td style="font-size: 20px; color: #202225; margin-top: 0; text-align: left;width:50%;"> ${eventManager}</td>
                            </tr>
                                   
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
  
  
  const sendHodRejectionEmailTemplate = (
    // eventName,
    // bookedTransportName,
  //   organizingClub,
  eventManager,
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
                  <p style="font-size: 18px; margin-bottom: 30px; color: #202225; max-width: 60ch; margin-left: auto; margin-right: auto">Your transport booking request has been rejected due to following reason. Please review the booking details provided below and click the button below to view the booking.</p>
                    <h1 style="font-size: 25px;text-align: left; color: #202225; margin-top: 0;">Reason for Rejection</h1>
                  <p style="font-size: 18px; margin-bottom: 30px; color: #202225; max-width: 60ch; text-align: left;">${rejectionReason}</p>
                          
                            <table style="width: 100%;" >
                        <tr>
                            
                                <h1 style="font-size: 25px;text-align: left; color: #202225; margin-top: 0;">Booking Details</h1>
                                <table style="width: 100%;" >
                                   
                                <tr>
                                <td style="font-size: 20px; color: #202225; margin-top: 0; text-align: left;width:50%;">Booking Faculty/Staff :</td>
                                <td style="font-size: 20px; color: #202225; margin-top: 0; text-align: left;width:50%;"> ${eventManager}</td>
                            </tr>
                                   
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
  
  
  





  

const sendApprovalEmailTemplate = (
    // nameOfDriver,
    // mobNoOfDriver,
    bookedTransportId,
    // bookedTransportName,
    // bookedTransportNumber,
    // bookedTransportTransportType,
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
    eventEndDate,MainStartTime,
          MainEndTime,
    bookingId
  ) => {
  
    let transportDetails = '';
  
    bookedTransportId.forEach((transport, index) => {
      transportDetails += `
      <h1 style="font-size: 25px;text-align: left; color: #202225; margin-top: 0;">Vehicle ${index + 1}</h1>
      <table style="width: 100%;" >
          <tr>
              <td style="font-size: 20px; color: #202225; margin-top: 0; text-align: left;width:50%;">Vehicle Name:</td>
              <td style="font-size: 20px; color: #202225; margin-top: 0; text-align: left;width:50%;">${transport.name}</td>
          </tr>
          <tr>
              <td style="font-size: 20px; color: #202225; margin-top: 0; text-align: left;width:50%;">Vehicle Number:</td>
              <td style="font-size: 20px; color: #202225; margin-top: 0; text-align: left;width:50%;"> ${transport.number}</td>
          </tr>
      <tr>
              <td style="font-size: 20px; color: #202225; margin-top: 0; text-align: left;width:50%;">Vehicle Type:</td>
              <td style="font-size: 20px; color: #202225; margin-top: 0;  text-transform: capitalize; text-align: left;width:50%;"> ${transport.transportType}</td>
          </tr>
          <tr>
          <td style="font-size: 20px; color: #202225; margin-top: 0; text-align: left;width:50%;">Driver's Name:</td>
          <td style="font-size: 20px; color: #202225; margin-top: 0; text-align: left;width:50%;"> ${transport.nameOfDriver}</td>
      </tr>
  <tr>
          <td style="font-size: 20px; color: #202225; margin-top: 0; text-align: left;width:50%;">Driver's Mobile No.:</td>
          <td style="font-size: 20px; color: #202225; margin-top: 0;  text-transform: capitalize; text-align: left;width:50%;"> ${transport.mobNoOfDriver}</td>
      </tr>
        
      </table>
  
      <br>
      `;
    });
  
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
                                <p style="font-size: 18px; margin-bottom: 30px; color: #202225; max-width: 60ch; margin-left: auto; margin-right: auto">Your transport booking request has been approved. Please review the booking details provided below and click the button below to view the booking.</p>
                             
                              
                              
                                    
                                <table style="width: 100%;">
                        <tr>
                            <br>
                                <h1 style="font-size: 25px;text-align: left; color: #202225; margin-top: 0;">Transport Details</h1>
                                ${transportDetails}
                               
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
                                      <td style="font-size: 20px; color: #202225; margin-top: 0; text-align: left;width:50%;">Start Time:</td>
                                      <td style="font-size: 20px; color: #202225; margin-top: 0; text-align: left;width:50%;"> ${MainStartTime}</td>
                                  </tr>
  
                                  <tr>
                                  <td style="font-size: 20px; color: #202225; margin-top: 0; text-align: left;width:50%;">End Time:</td>
                                  <td style="font-size: 20px; color: #202225; margin-top: 0; text-align: left;width:50%;"> ${MainEndTime}</td>
                              </tr>
                                      
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
            <center>  <a href="${process.env.CLIENT_URL}/transport-booking-system/bookingsView/${bookingId}"  style="background-color: #4f46e5; color: #fff; padding: 8px 24px;  border-radius: 8px; border-style: solid; border-color: #4f46e5; font-size: 14px; text-decoration: none; cursor: pointer">View Booking</a></center>
        </tbody>
                   
    </table>
  </body>
  
  
    
    
        `;
  };
  
  
  const sendHodApprovalEmailTemplate  = (
    bookedTransportId,
    // nameOfDriver,
    // mobNoOfDriver,
    // bookedTransportName,
    // bookedTransportNumber,
    // bookedTransportTransportType,
    // bookedTransportPhoto,
    // eventName,
  //   organizingClub,
    eventManager,
    
    institution,
    department,
    eventDate,
    selfOrGuest,
    noOfPerson,
    eventDateType,
    eventStartDate,
    eventEndDate,MainStartTime,
          MainEndTime,
    bookingId
  ) => {
  
    
    let transportDetails = '';
  
    bookedTransportId.forEach((transport, index) => {
      transportDetails += `
      <h1 style="font-size: 25px;text-align: left; color: #202225; margin-top: 0;">Vehicle ${index + 1}</h1>
      <table style="width: 100%;" >
          <tr>
              <td style="font-size: 20px; color: #202225; margin-top: 0; text-align: left;width:50%;">Vehicle Name:</td>
              <td style="font-size: 20px; color: #202225; margin-top: 0; text-align: left;width:50%;">${transport.name}</td>
          </tr>
          <tr>
              <td style="font-size: 20px; color: #202225; margin-top: 0; text-align: left;width:50%;">Vehicle Number:</td>
              <td style="font-size: 20px; color: #202225; margin-top: 0; text-align: left;width:50%;"> ${transport.number}</td>
          </tr>
      <tr>
              <td style="font-size: 20px; color: #202225; margin-top: 0; text-align: left;width:50%;">Vehicle Type:</td>
              <td style="font-size: 20px; color: #202225; margin-top: 0;  text-transform: capitalize; text-align: left;width:50%;"> ${transport.transportType}</td>
          </tr>
          <tr>
          <td style="font-size: 20px; color: #202225; margin-top: 0; text-align: left;width:50%;">Driver's Name:</td>
          <td style="font-size: 20px; color: #202225; margin-top: 0; text-align: left;width:50%;"> ${transport.nameOfDriver}</td>
      </tr>
  <tr>
          <td style="font-size: 20px; color: #202225; margin-top: 0; text-align: left;width:50%;">Driver's Mobile No.:</td>
          <td style="font-size: 20px; color: #202225; margin-top: 0;  text-transform: capitalize; text-align: left;width:50%;"> ${transport.mobNoOfDriver}</td>
      </tr>
        
      </table>
  
      <br>
      `;
    });
  
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
                                <h1 style="font-size: 30px; color: #202225; margin-top: 0;">Hello</h1>
                                <p style="font-size: 18px; margin-bottom: 30px; color: #202225; max-width: 60ch; margin-left: auto; margin-right: auto">Transport booking requested from your department has been approved. Please review the booking details provided below and click the button below to view the booking.</p>
                               
                              
                              
                                    
                                <table style="width: 100%;">
                        <tr>
                            <br>
                                <h1 style="font-size: 25px;text-align: left; color: #202225; margin-top: 0;">Transport Details</h1>
                               ${transportDetails}
                          <br>
                            <table style="width: 100%;" >
                        <tr>
                            
                                <h1 style="font-size: 25px;text-align: left; color: #202225; margin-top: 0;">Booking Details</h1>
                                <table style="width: 100%;" >
                                <tr>
                                <td style="font-size: 20px; color: #202225; margin-top: 0; text-align: left;width:50%;">Booking Faculty/Staff :</td>
                                <td style="font-size: 20px; color: #202225; margin-top: 0; text-align: left;width:50%;"> ${eventManager}</td>
                            </tr>
                                   
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
                                      <td style="font-size: 20px; color: #202225; margin-top: 0; text-align: left;width:50%;">Start Time:</td>
                                      <td style="font-size: 20px; color: #202225; margin-top: 0; text-align: left;width:50%;"> ${MainStartTime}</td>
                                  </tr>
  
                                  <tr>
                                  <td style="font-size: 20px; color: #202225; margin-top: 0; text-align: left;width:50%;">End Time:</td>
                                  <td style="font-size: 20px; color: #202225; margin-top: 0; text-align: left;width:50%;"> ${MainEndTime}</td>
                              </tr>
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
  
  
  
 module.exports = { sendApprovalEmailTemplate, sendRejectionEmailTemplate, sendHodApprovalEmailTemplate, sendHodRejectionEmailTemplate, generateBookingEmailTemplate , generateHodEmailTemplate,generateBookingUpdatedEmailTemplate,generateHodUpdatedEmailTemplate };