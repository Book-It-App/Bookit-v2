const approvalEmailTemplate = (
  nameOfDriver,
  mobNoOfDriver,
  bookedTransportName,
  bookedTransportNumber,
  bookedTransportCapacity,
  eventName,
  organizingClub,
  institution,
  department,
  MainDate,
  selfOrGuest,
  noOfPerson,
  eventDateType,
  StartDate,
  EndDate,
  bookingId
) => {
  return `

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html dir="ltr" xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office" lang="en">
 <head>
  <meta charset="UTF-8">
  <meta content="width=device-width, initial-scale=1" name="viewport">
  <meta name="x-apple-disable-message-reformatting">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta content="telephone=no" name="format-detection">
  <title>New Template 2</title><!--[if (mso 16)]>
    <style type="text/css">
    a {text-decoration: none;}
    </style>
    <![endif]--><!--[if gte mso 9]><style>sup { font-size: 100% !important; }</style><![endif]--><!--[if gte mso 9]>
<xml>
    <o:OfficeDocumentSettings>
    <o:AllowPNG></o:AllowPNG>
    <o:PixelsPerInch>96</o:PixelsPerInch>
    </o:OfficeDocumentSettings>
</xml>
<![endif]--><!--[if !mso]><!-- -->
  <link href="https://fonts.googleapis.com/css2?family=Jost&display=swap" rel="stylesheet"><!--<![endif]--><!--[if mso]>
 <style type="text/css">
     ul {
  margin: 0 !important;
  }
  ol {
  margin: 0 !important;
  }
  li {
  margin-left: 47px !important;
  }
 </style><![endif]
-->
  <style type="text/css">
.rollover:hover .rollover-first {
  max-height:0px!important;
  display:none!important;
  }
  .rollover:hover .rollover-second {
  max-height:none!important;
  display:block!important;
  }
  .rollover span {
  font-size:0px;
  }
  u + .body img ~ div div {
  display:none;
  }
  #outlook a {
  padding:0;
  }
  span.MsoHyperlink,
span.MsoHyperlinkFollowed {
  color:inherit;
  mso-style-priority:99;
  }
  a.es-button {
  mso-style-priority:100!important;
  text-decoration:none!important;
  }
  a[x-apple-data-detectors] {
  color:inherit!important;
  text-decoration:none!important;
  font-size:inherit!important;
  font-family:inherit!important;
  font-weight:inherit!important;
  line-height:inherit!important;
  }
  .es-desk-hidden {
  display:none;
  float:left;
  overflow:hidden;
  width:0;
  max-height:0;
  line-height:0;
  mso-hide:all;
  }
  .es-button-border:hover > a.es-button {
  color:#ffffff!important;
  }
@media only screen and (max-width:600px) {.es-m-p0r { padding-right:0px!important } .es-m-p5b { padding-bottom:5px!important } .es-m-p0r { padding-right:0px!important } .es-m-p40r { padding-right:40px!important } *[class="gmail-fix"] { display:none!important } p, a { line-height:150%!important } h1, h1 a { line-height:120%!important } h2, h2 a { line-height:120%!important } h3, h3 a { line-height:120%!important } h4, h4 a { line-height:120%!important } h5, h5 a { line-height:120%!important } h6, h6 a { line-height:120%!important } h1 { font-size:30px!important; text-align:left } h2 { font-size:24px!important; text-align:left } h3 { font-size:20px!important; text-align:left } h4 { font-size:24px!important; text-align:left } h5 { font-size:20px!important; text-align:left } h6 { font-size:16px!important; text-align:left } .es-header-body h1 a, .es-content-body h1 a, .es-footer-body h1 a { font-size:30px!important } .es-header-body h2 a, .es-content-body h2 a, .es-footer-body h2 a { font-size:24px!important } .es-header-body h3 a, .es-content-body h3 a, .es-footer-body h3 a { font-size:20px!important } .es-header-body h4 a, .es-content-body h4 a, .es-footer-body h4 a { font-size:24px!important } .es-header-body h5 a, .es-content-body h5 a, .es-footer-body h5 a { font-size:20px!important } .es-header-body h6 a, .es-content-body h6 a, .es-footer-body h6 a { font-size:16px!important } .es-menu td a { font-size:14px!important } .es-header-body p, .es-header-body a { font-size:14px!important } .es-content-body p, .es-content-body a { font-size:14px!important } .es-footer-body p, .es-footer-body a { font-size:14px!important } .es-infoblock p, .es-infoblock a { font-size:12px!important } .es-m-txt-c, .es-m-txt-c h1, .es-m-txt-c h2, .es-m-txt-c h3, .es-m-txt-c h4, .es-m-txt-c h5, .es-m-txt-c h6 { text-align:center!important } .es-m-txt-r, .es-m-txt-r h1, .es-m-txt-r h2, .es-m-txt-r h3, .es-m-txt-r h4, .es-m-txt-r h5, .es-m-txt-r h6 { text-align:right!important } .es-m-txt-j, .es-m-txt-j h1, .es-m-txt-j h2, .es-m-txt-j h3, .es-m-txt-j h4, .es-m-txt-j h5, .es-m-txt-j h6 { text-align:justify!important } .es-m-txt-l, .es-m-txt-l h1, .es-m-txt-l h2, .es-m-txt-l h3, .es-m-txt-l h4, .es-m-txt-l h5, .es-m-txt-l h6 { text-align:left!important } .es-m-txt-r img, .es-m-txt-c img, .es-m-txt-l img { display:inline!important } .es-m-txt-r .rollover:hover .rollover-second, .es-m-txt-c .rollover:hover .rollover-second, .es-m-txt-l .rollover:hover .rollover-second { display:inline!important } .es-m-txt-r .rollover span, .es-m-txt-c .rollover span, .es-m-txt-l .rollover span { line-height:0!important; font-size:0!important } .es-spacer { display:inline-table } a.es-button, button.es-button { font-size:18px!important; line-height:120%!important } a.es-button, button.es-button, .es-button-border { display:inline-block!important } .es-m-fw, .es-m-fw.es-fw, .es-m-fw .es-button { display:block!important } .es-m-il, .es-m-il .es-button, .es-social, .es-social td, .es-menu { display:inline-block!important } .es-adaptive table, .es-left, .es-right { width:100%!important } .es-content table, .es-header table, .es-footer table, .es-content, .es-footer, .es-header { width:100%!important; max-width:600px!important } .adapt-img { width:100%!important; height:auto!important } .es-mobile-hidden, .es-hidden { display:none!important } .es-desk-hidden { width:auto!important; overflow:visible!important; float:none!important; max-height:inherit!important; line-height:inherit!important } tr.es-desk-hidden { display:table-row!important } table.es-desk-hidden { display:table!important } td.es-desk-menu-hidden { display:table-cell!important } .es-menu td { width:1%!important } table.es-table-not-adapt, .esd-block-html table { width:auto!important } .es-social td { padding-bottom:10px } .h-auto { height:auto!important } .img-2338 { width:100px!important } .es-m-w0 { width:0px!important } .es-text-8914, .es-text-8914 p, .es-text-8914 a, .es-text-8914 h1, .es-text-8914 h2, .es-text-8914 h3, .es-text-8914 h4, .es-text-8914 h5, .es-text-8914 h6, .es-text-8914 ul, .es-text-8914 ol, .es-text-8914 li, .es-text-8914 span, .es-text-8914 sup, .es-text-8914 sub, .es-text-8914 u, .es-text-8914 b, .es-text-8914 strong, .es-text-8914 em, .es-text-8914 i { font-size:16px!important } .es-text-8914 .es-text-mobile-size-16, .es-text-8914 .es-text-mobile-size-16 * { font-size:16px!important; line-height:150%!important } .img-1607 { width:100px!important } }
@media screen and (max-width:384px) {.mail-message-content { width:414px!important } }
</style>
 </head>
 <body class="body" style="width:100%;height:100%;padding:0;Margin:0">
  <div dir="ltr" class="es-wrapper-color" lang="en" style="background-color:#F6F6F6"><!--[if gte mso 9]>
			<v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t">
				<v:fill type="tile" color="#f6f6f6"></v:fill>
			</v:background>
		<![endif]-->
   <table class="es-wrapper" width="100%" cellspacing="0" cellpadding="0" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;padding:0;Margin:0;width:100%;height:100%;background-repeat:repeat;background-position:center top;background-color:#F6F6F6">
     <tr>
      <td valign="top" style="padding:0;Margin:0">
       <table class="es-header" cellspacing="0" cellpadding="0" align="center" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;width:100%;table-layout:fixed !important;background-color:transparent;background-repeat:repeat;background-position:center top">
         <tr>
          <td align="center" style="padding:0;Margin:0">
           <table class="es-header-body" cellspacing="0" cellpadding="0" bgcolor="#D4D9FA" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#d4d9fa;width:600px" role="none">
             <tr>
              <td align="left" style="Margin:0;padding-top:35px;padding-right:20px;padding-bottom:30px;padding-left:20px"><!--[if mso]><table style="width:560px" cellpadding="0" cellspacing="0"><tr><td style="width:270px" valign="top"><![endif]-->
               <table class="es-left" cellspacing="0" cellpadding="0" align="left" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left">
                 <tr>
                  <td class="es-m-p0r es-m-p5b" valign="top" align="center" style="padding:0;Margin:0;width:270px">
                   <table width="100%" cellspacing="0" cellpadding="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                     <tr>
                      <td align="left" class="es-text-8914" style="padding:0;Margin:0"><h2 style="Margin:0;font-family:Jost, Arial, sans-serif;mso-line-height-rule:exactly;letter-spacing:0;font-size:24px;font-style:normal;font-weight:normal;line-height:58px;color:#020202"><strong><span style="font-size:48px;line-height:72px;color:#4338ca" class="es-text-mobile-size-16 ">Book<span class="es-text-mobile-size-16">​</span></span><span style="font-size:48px;line-height:72px" class="es-text-mobile-size-16 "></span><span style="font-size:48px;line-height:72px" class="es-text-mobile-size-16 ">It​</span><span style="font-size:48px;line-height:72px">​</span></strong></h2></td>
                     </tr>
                   </table></td>
                 </tr>
               </table><!--[if mso]></td><td style="width:20px"></td><td style="width:270px" valign="top"><![endif]-->
               <table cellpadding="0" cellspacing="0" class="es-right" align="right" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:right">
                 <tr>
                  <td align="left" style="padding:0;Margin:0;width:270px">
                   <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                     <tr>
                      <td align="center" class="es-m-txt-l" style="padding:0;Margin:0;font-size:0"><img src="https://fbsbzvs.stripocdn.email/content/guids/CABINET_7ec9965d42e5d9881255ca7a8bec6af1cee8019a518b6c9cf890aa751cb7655b/images/logo.png" alt="" class="img-2338" width="270" style="display:block;font-size:14px;border:0;outline:none;text-decoration:none"></td>
                     </tr>
                   </table></td>
                 </tr>
               </table><!--[if mso]></td></tr></table><![endif]--></td>
             </tr>
             <tr>
              <td align="left" style="padding:0;Margin:0;padding-right:20px;padding-left:20px">
               <table cellpadding="0" cellspacing="0" width="100%" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                 <tr>
                  <td align="center" valign="top" style="padding:0;Margin:0;width:560px">
                   <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                     <tr>
                      <td align="center" style="padding:0;Margin:0;padding-top:5px;padding-bottom:5px;font-size:0">
                       <table border="0" width="100%" height="100%" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                         <tr>
                          <td style="padding:0;Margin:0;border-bottom:1px solid #3a0bc7;background:unset;height:1px;width:100%;margin:0px"></td>
                         </tr>
                       </table></td>
                     </tr>
                   </table></td>
                 </tr>
               </table></td>
             </tr>
           </table></td>
         </tr>
       </table>
       <table class="es-content" cellspacing="0" cellpadding="0" align="center" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;width:100%;table-layout:fixed !important">
         <tr>
          <td align="center" style="padding:0;Margin:0">
           <table class="es-content-body" cellspacing="0" cellpadding="0" bgcolor="#D4D9FA" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#d4d9fa;background-repeat:no-repeat;width:600px;background-image:url(https://fbsbzvs.stripocdn.email/content/guids/CABINET_e18e8b6ad0d2f530731f1cc3bd27d47df9d75aa833914e627ec524bf07cda11b/images/14731345_rm222mind20_1_5nq.png);background-position:right bottom" background="https://fbsbzvs.stripocdn.email/content/guids/CABINET_e18e8b6ad0d2f530731f1cc3bd27d47df9d75aa833914e627ec524bf07cda11b/images/14731345_rm222mind20_1_5nq.png" role="none">
             <tr>
              <td align="left" style="Margin:0;padding-right:20px;padding-left:20px;padding-top:30px;padding-bottom:20px">
               <table cellspacing="0" cellpadding="0" align="right" class="es-right" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:right">
                 <tr>
                  <td class="es-m-p0r" valign="top" align="center" style="padding:0;Margin:0;width:560px">
                   <table width="100%" cellspacing="0" cellpadding="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                     <tr>
                      <td align="left" style="padding:0;Margin:0"><h1 style="Margin:0;font-family:Jost, Arial, sans-serif;mso-line-height-rule:exactly;letter-spacing:0;font-size:30px;font-style:normal;font-weight:normal;line-height:36px;color:#429a40"><strong>Your Booking Has Been Approved</strong></h1></td>
                     </tr>
                     <tr>
                      <td align="left" class="es-m-p40r" style="padding:0;Margin:0;padding-top:25px;padding-bottom:40px"><h3 style="Margin:0;font-family:Jost, Arial, sans-serif;mso-line-height-rule:exactly;letter-spacing:0;font-size:20px;font-style:normal;font-weight:normal;line-height:24px;color:#020202">Dear User,</h3><p style="Margin:0;mso-line-height-rule:exactly;font-family:Jost, Arial, sans-serif;line-height:21px;letter-spacing:0;color:#020202;font-size:14px"><br></p><p style="Margin:0;mso-line-height-rule:exactly;font-family:Jost, Arial, sans-serif;line-height:21px;letter-spacing:0;color:#020202;font-size:14px">Your booking request has been approved.&nbsp;</p><p style="Margin:0;mso-line-height-rule:exactly;font-family:Jost, Arial, sans-serif;line-height:21px;letter-spacing:0;color:#020202;font-size:14px">Please review the booking details provided below and click the button below to view the booking.</p></td>
                     </tr>
                   </table></td>
                 </tr>
               </table></td>
             </tr>
           </table></td>
         </tr>
       </table>
       <table cellpadding="0" cellspacing="0" class="es-content" align="center" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;width:100%;table-layout:fixed !important">
         <tr>
          <td align="center" style="padding:0;Margin:0">
           <table bgcolor="#fffdf7" class="es-content-body" align="center" cellpadding="0" cellspacing="0" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFDF7;width:600px">
             <tr>
              <td align="left" style="padding:0;Margin:0;padding-right:20px;padding-left:20px;padding-top:20px">
               <table cellpadding="0" cellspacing="0" width="100%" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                 <tr>
                  <td align="center" valign="top" style="padding:0;Margin:0;width:560px">
                   <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                     <tr>
                      <td align="left" style="padding:0;Margin:0"><h2 style="Margin:0;font-family:Jost, Arial, sans-serif;mso-line-height-rule:exactly;letter-spacing:0;font-size:24px;font-style:normal;font-weight:normal;line-height:29px;color:#020202">DRIVER DETAILS</h2></td>
                     </tr>
                     <tr>
                      <td align="left" style="padding:0;Margin:0;padding-top:10px;padding-bottom:10px">
                       <ul style="font-family:Jost, Arial, sans-serif;padding:0px 0px 0px 40px;margin:15px 0px">
                        <li style="color:#020202;margin:0px 0px 15px;font-size:14px"><strong>Driver Name:</strong> ${nameOfDriver}</li>
                        <li style="color:#020202;margin:0px 0px 15px;font-size:14px"><strong>Driver Number:</strong> ${mobNoOfDriver}</li>
                       </ul></td>
                     </tr>
                   </table></td>
                 </tr>
               </table></td>
             </tr>
             <tr>
              <td align="left" style="padding:0;Margin:0;padding-right:20px;padding-left:20px">
               <table cellpadding="0" cellspacing="0" width="100%" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                 <tr>
                  <td align="center" valign="top" style="padding:0;Margin:0;width:560px">
                   <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                     <tr>
                      <td align="center" style="padding:0;Margin:0;padding-top:5px;padding-bottom:5px;font-size:0">
                       <table border="0" width="100%" height="100%" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                         <tr>
                          <td style="padding:0;Margin:0;border-bottom:1px solid #d4d9fa;background:unset;height:1px;width:100%;margin:0px"></td>
                         </tr>
                       </table></td>
                     </tr>
                   </table></td>
                 </tr>
               </table></td>
             </tr>
             <tr>
              <td align="left" style="padding:0;Margin:0;padding-right:20px;padding-left:20px;padding-top:20px">
               <table cellpadding="0" cellspacing="0" width="100%" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                 <tr>
                  <td align="center" valign="top" style="padding:0;Margin:0;width:560px">
                   <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                     <tr>
                      <td align="left" style="padding:0;Margin:0"><h2 style="Margin:0;font-family:Jost, Arial, sans-serif;mso-line-height-rule:exactly;letter-spacing:0;font-size:24px;font-style:normal;font-weight:normal;line-height:29px;color:#020202">DRIVER DETAILS</h2></td>
                     </tr>
                     <tr>
                      <td align="left" style="padding:0;Margin:0;padding-top:10px;padding-bottom:10px">
                       <ul style="font-family:Jost, Arial, sans-serif;padding:0px 0px 0px 40px;margin:15px 0px">
                        <li style="color:#020202;margin:0px 0px 15px;font-size:14px"><strong>Vehicle Name:</strong> ${bookedTransportName}</li>
                        <li style="color:#020202;margin:0px 0px 15px;font-size:14px"><strong>Vehicle Number:</strong> ${bookedTransportNumber}</li>
                        <li style="color:#020202;margin:0px 0px 15px;font-size:14px"><strong>Vehicle Capacity:</strong> ${bookedTransportCapacity}</li>
                       </ul></td>
                     </tr>
                   </table></td>
                 </tr>
               </table></td>
             </tr>
             <tr>
              <td align="left" style="padding:0;Margin:0;padding-right:20px;padding-left:20px">
               <table cellpadding="0" cellspacing="0" width="100%" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                 <tr>
                  <td align="center" valign="top" style="padding:0;Margin:0;width:560px">
                   <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                     <tr>
                      <td align="center" style="padding:0;Margin:0;padding-top:5px;padding-bottom:5px;font-size:0">
                       <table border="0" width="100%" height="100%" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                         <tr>
                          <td style="padding:0;Margin:0;border-bottom:1px solid #d4d9fa;background:unset;height:1px;width:100%;margin:0px"></td>
                         </tr>
                       </table></td>
                     </tr>
                   </table></td>
                 </tr>
               </table></td>
             </tr>
             <tr>
              <td align="left" style="padding:20px;Margin:0">
               <table cellpadding="0" cellspacing="0" width="100%" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                 <tr>
                  <td align="center" valign="top" style="padding:0;Margin:0;width:560px">
                   <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                     <tr>
                      <td align="left" style="padding:0;Margin:0;padding-bottom:20px"><h2 style="Margin:0;font-family:Jost, Arial, sans-serif;mso-line-height-rule:exactly;letter-spacing:0;font-size:24px;font-style:normal;font-weight:normal;line-height:29px;color:#020202">BOOKING DETAILS</h2></td>
                     </tr>
                     <tr>
                      <td align="left" style="padding:0;Margin:0;padding-top:10px;padding-bottom:10px">
                       <ul style="font-family:Jost, Arial, sans-serif;padding:0px 0px 0px 40px;margin:15px 0px">
                        <li style="color:#020202;margin:0px 0px 15px;font-size:14px"><p style="Margin:0;mso-line-height-rule:exactly;font-family:Jost, Arial, sans-serif;line-height:21px;letter-spacing:0;color:#020202;font-size:14px;mso-margin-top-alt:15px"><strong>Event Name:</strong> ${eventName}</p></li>
                        <li style="color:#020202;margin:0px 0px 15px;font-size:14px"><p style="Margin:0;mso-line-height-rule:exactly;font-family:Jost, Arial, sans-serif;line-height:21px;letter-spacing:0;color:#020202;font-size:14px"><strong>Organizing Club:</strong> ${organizingClub}</p></li>
                        <li style="color:#020202;margin:0px 0px 15px;font-size:14px"><p style="Margin:0;mso-line-height-rule:exactly;font-family:Jost, Arial, sans-serif;line-height:21px;letter-spacing:0;color:#020202;font-size:14px"><strong>Institution:</strong> ${institution}</p></li>
                        <li style="color:#020202;margin:0px 0px 15px;font-size:14px"><p style="Margin:0;mso-line-height-rule:exactly;font-family:Jost, Arial, sans-serif;line-height:21px;letter-spacing:0;color:#020202;font-size:14px"><strong>Department:</strong> ${department}</p></li>
                      
                        ${(eventDateType === "half" || eventDateType === "full") ? `
                        <li style="color:#020202;margin:0px 0px 15px;font-size:14px"><p style="Margin:0;mso-line-height-rule:exactly;font-family:Jost, Arial, sans-serif;line-height:21px;letter-spacing:0;color:#020202;font-size:14px"><strong>Date:</strong> ${MainDate}</p></li>
                      `
                        :`
                      <li style="color:#020202;margin:0px 0px 15px;font-size:14px"><p style="Margin:0;mso-line-height-rule:exactly;font-family:Jost, Arial, sans-serif;line-height:21px;letter-spacing:0;color:#020202;font-size:14px"><strong>From:</strong> ${StartDate}</p></li>
                      <li style="color:#020202;margin:0px 0px 15px;font-size:14px"><p style="Margin:0;mso-line-height-rule:exactly;font-family:Jost, Arial, sans-serif;line-height:21px;letter-spacing:0;color:#020202;font-size:14px"><strong>To:</strong> ${EndDate}</p></li>
                      `
                    }
                       </ul>
                     


                       <ul style="font-family:Jost, Arial, sans-serif;padding:0px 0px 0px 40px;margin:15px 0px">
                        <li style="color:#020202;margin:0px 0px 15px;font-size:14px"><p style="Margin:0;mso-line-height-rule:exactly;font-family:Jost, Arial, sans-serif;line-height:21px;letter-spacing:0;color:#020202;font-size:14px;mso-margin-bottom-alt:15px;mso-margin-top-alt:15px"><strong>Self / Guest:</strong> ${selfOrGuest}</p></li>
                       </ul>
                       <ul style="font-family:Jost, Arial, sans-serif;padding:0px 0px 0px 40px;margin:15px 0px">
                        <li style="color:#020202;margin:0px 0px 15px;font-size:14px"><p style="Margin:0;mso-line-height-rule:exactly;font-family:Jost, Arial, sans-serif;line-height:21px;letter-spacing:0;color:#020202;font-size:14px;mso-margin-bottom-alt:15px;mso-margin-top-alt:15px"><strong>No. Of Person:</strong> ${noOfPerson}</p></li>
                       </ul>
                       <ul style="font-family:Jost, Arial, sans-serif;padding:0px 0px 0px 40px;margin:15px 0px">
                       </ul>
                       <ul style="font-family:Jost, Arial, sans-serif;padding:0px 0px 0px 40px;margin:15px 0px">
                       </ul></td>
                     </tr>
                   </table></td>
                 </tr>
               </table></td>
             </tr>
             <tr>
              <td align="left" style="padding:0;Margin:0;padding-right:20px;padding-left:20px">
               <table cellpadding="0" cellspacing="0" width="100%" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                 <tr>
                  <td align="center" valign="top" style="padding:0;Margin:0;width:560px">
                   <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                     <tr>
                      <td align="center" style="padding:0;Margin:0;padding-top:5px;padding-bottom:5px;font-size:0">
                       <table border="0" width="100%" height="100%" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                         <tr>
                          <td style="padding:0;Margin:0;border-bottom:1px solid #d4d9fa;background:unset;height:1px;width:100%;margin:0px"></td>
                         </tr>
                       </table></td>
                     </tr>
                   </table></td>
                 </tr>
               </table></td>
             </tr>
           </table></td>
         </tr>
       </table>
       <table cellpadding="0" cellspacing="0" class="es-footer" align="center" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;width:100%;table-layout:fixed !important;background-color:transparent;background-repeat:repeat;background-position:center top">
         <tr>
          <td align="center" style="padding:0;Margin:0">
           <table class="es-footer-body" cellspacing="0" cellpadding="0" bgcolor="#ffffff" align="center" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#3A0BC7;width:600px">
             <tr>
              <td align="left" bgcolor="#fdfdfe" style="Margin:0;padding-right:20px;padding-bottom:30px;padding-left:20px;padding-top:30px;background-color:#fdfdfe">
               <table cellpadding="0" cellspacing="0" width="100%" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                 <tr>
                  <td align="left" style="padding:0;Margin:0;width:560px">
                   <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                     <tr>
                      <td align="center" style="padding:0;Margin:0"><!--[if mso]><a href="${process.env.CLIENT_URL}/transport-booking-system/bookingsView/${bookingId}" target="_blank" hidden>
	<v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" esdevVmlButton href="${process.env.CLIENT_URL}/transport-booking-system/bookingsView/${bookingId}" 
                style="height:41px; v-text-anchor:middle; width:148px" arcsize="50%" stroke="f"  fillcolor="#4338ca">
		<w:anchorlock></w:anchorlock>
		<center style='color:#ffffff; font-family:Jost, Arial, sans-serif; font-size:15px; font-weight:400; line-height:15px;  mso-text-raise:1px'>View Booking</center>
	</v:roundrect></a>
<![endif]--><!--[if !mso]><!-- --><span class="es-button-border msohide" style="border-style:solid;border-color:#2CB543;background:#4338ca;border-width:0px;display:inline-block;border-radius:30px;width:auto;mso-hide:all"><a href="${process.env.CLIENT_URL}/transport-booking-system/bookingsView/${bookingId}" class="es-button" target="_blank" style="mso-style-priority:100 !important;text-decoration:none !important;mso-line-height-rule:exactly;color:#FFFFFF;font-size:18px;padding:10px 20px 10px 20px;display:inline-block;background:#4338ca;border-radius:30px;font-family:Jost, Arial, sans-serif;font-weight:normal;font-style:normal;line-height:22px;width:auto;text-align:center;letter-spacing:0;mso-padding-alt:0;mso-border-alt:10px solid #4338ca">View Booking</a></span><!--<![endif]--></td>
                     </tr>
                   </table></td>
                 </tr>
               </table></td>
             </tr>
           </table></td>
         </tr>
       </table>
       <table class="es-footer" cellspacing="0" cellpadding="0" align="center" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;width:100%;table-layout:fixed !important;background-color:transparent;background-repeat:repeat;background-position:center top">
         <tr>
          <td align="center" style="padding:0;Margin:0">
           <table class="es-footer-body" cellspacing="0" cellpadding="0" bgcolor="#ffffff" align="center" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#3A0BC7;width:600px">
             <tr>
              <td align="left" bgcolor="#fefdfd" style="Margin:0;padding-right:20px;padding-left:20px;padding-bottom:20px;padding-top:20px;background-color:#fefdfd">
               <table cellspacing="0" cellpadding="0" width="100%" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                 <tr>
                  <td align="left" style="padding:0;Margin:0;width:560px">
                   <table width="100%" cellspacing="0" cellpadding="0" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                     <tr>
                      <td align="center" style="padding:0;Margin:0;display:none"></td>
                     </tr>
                   </table></td>
                 </tr>
               </table></td>
             </tr>
           </table></td>
         </tr>
       </table></td>
     </tr>
   </table>
  </div>
 </body>
</html>

`;
};


module.exports = approvalEmailTemplate;
