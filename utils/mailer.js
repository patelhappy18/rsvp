const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER, // your Gmail email
    pass: process.env.EMAIL_PASS, // your Gmail app password
  },
});

// var transport = nodemailer.createTransport({
//   host: "sandbox.smtp.mailtrap.io",
//   port: 2525,
//   auth: {
//     user: "ed5df11a05a802",
//     pass: "df2bc1a777a292",
//   },
// });

const sendRSVPConfirmation = async (
  to,
  name,
  guestsInThisBooking,
  totalGuests
) => {
  const mailOptions2 = {
    from: `"Event Host" Vihang & Drashti Patel`,
    to: "patelhappy9581@gmail.com",
    subject: "RSVP Confirmation Count ",
    html: `
  <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #333; padding: 20px; line-height: 1.6;">
    <div style="max-width: 600px; margin: auto; background: #f9f9f9; border-radius: 10px; padding: 30px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
      <h2 style="color: #6b46c1; text-align: center;">Total RSVP count for Satyanarayan Bhagwan Katha </h2>

      <p>Dear <strong>Vihang</strong>,</p>

      <div style="background: #fff; border-left: 4px solid #6b46c1; padding: 15px; margin: 20px 0; border-radius: 6px;">
        <p style="margin: 0;"><strong>📅 RSVP Total Guest:</strong> ${totalGuests}</p>
      </div>


      <hr style="margin-top: 40px; border: none; border-top: 1px solid #ddd;" />
      <p style="font-size: 12px; color: #777; text-align: center;">
        This is an automated confirmation message. Please do not reply directly.
      </p>
    </div>
  </div>
`,
  };

  const mailOptions = {
    from: `"Event Host" Vihang & Drashti Patel`,
    to: to,
    subject: "RSVP Confirmation - સત્યનારાયણ ભગવાનની કથા ",
    html: `
  <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #333; padding: 20px; line-height: 1.6;">
    <div style="max-width: 600px; margin: auto; background: #f9f9f9; border-radius: 10px; padding: 30px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
      <h2 style="color: #6b46c1; text-align: center;">🙏 Satyanarayan Bhagwan Katha - RSVP Confirmation</h2>

      <p>Dear <strong>${name}</strong>,</p>

      <p>Thank you for confirming your RSVP for <strong>${guestsInThisBooking} people</strong>. We are truly delighted to have you join us for the sacred <strong>Satyanarayan Bhagwan Katha</strong>.</p>

      <div style="background: #fff; border-left: 4px solid #6b46c1; padding: 15px; margin: 20px 0; border-radius: 6px;">
        <p style="margin: 0;"><strong>📅 Date:</strong> August 10, 2025</p>
        <p style="margin: 0;"><strong>⏰ Time:</strong> 3:00 PM</p>
        <p style="margin: 0;"><strong>📍 Location:</strong> 425 Porte Road, Ajax, ON</p>
      </div>

      <p>If you have any questions or need assistance, feel free to reply to this email.</p>

      <p style="margin-top: 30px;">Warm regards,<br/>
      🙏 Vihang & Drashti</p>

      <hr style="margin-top: 40px; border: none; border-top: 1px solid #ddd;" />
      <p style="font-size: 12px; color: #777; text-align: center;">
        This is an automated confirmation message. Please do not reply directly.
      </p>
    </div>
  </div>
`,
  };

  await transporter.sendMail(mailOptions);
  await transporter.sendMail(mailOptions2);
};

module.exports = { sendRSVPConfirmation };
