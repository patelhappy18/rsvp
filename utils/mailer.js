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
  adults,
  kids,
  email,
  rsvpname
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
        <p style="margin: 0;"><strong>📅 RSVP Total Guest:</strong> Adults: ${adults} Kids: ${kids}</p>
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
    subject: "RSVP Confirmation – Baby Shower 👶🎀",
    html: `
  <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #333; padding: 20px; line-height: 1.6;">
    <div style="max-width: 600px; margin: auto; background: #f9f9f9; border-radius: 10px; padding: 30px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
      <h2 style="color: #ff8000; text-align: center;">🎀 Baby Shower – RSVP Confirmation</h2>

      <p>Dear <strong>${name}</strong>,</p>

      <p>
        Thank you for confirming your RSVP for <strong>Adults: ${adults} Kids:${kids} </strong>.
        We are so excited to celebrate this special moment with you at our <strong>Baby Shower</strong> 👶✨
      </p>

      <div style="background: #fff; border-left: 4px solid #ec4899; padding: 15px; margin: 20px 0; border-radius: 6px;">
        <p style="margin: 0;"><strong>📅 Date:</strong> 8th March 2026</p>
        <p style="margin: 0;"><strong>⏰ Time:</strong> 9:30 AM onwards</p>
        <p style="margin: 0;"><strong>📍 Location:</strong> <a href="https://www.google.com/maps/place/H.M.S.+Banquet+Hall/@43.8385297,-79.0205891,620m/data=!3m2!1e3!4b1!4m6!3m5!1s0x89d4df000e4f09f5:0xc9df397db967c7d3!8m2!3d43.8385297!4d-79.0205891!16s%2Fg%2F11vzbmb2ql?entry=ttu&g_ep=EgoyMDI2MDIwMy4wIKXMDSoASAFQAw%3D%3D" target="_blank" class="inline-flex items-center gap-2 text-blue-600 hover:underline">H.M.S. Banquet Hall, Ajax Community Centre, Ajax, ON</a>
      </p>
        
        </div>

      <p>If you need to update your RSVP details, you can do so using the button below:</p>


      <p>If you have any questions, feel free to reach out to us.</p>

      <p style="margin-top: 30px;">
        With love,<br/>
        💕 Vihang & Drashti
      </p>

      <hr style="margin-top: 40px; border: none; border-top: 1px solid #ddd;" />
      <p style="font-size: 12px; color: #777; text-align: center;">
        This is an automated confirmation email. Please do not reply directly.
      </p>
    </div>
  </div>
`,
  };

  await transporter.sendMail(mailOptions);
  await transporter.sendMail(mailOptions2);
};

module.exports = { sendRSVPConfirmation };
