const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false, // true হলে port 465
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

transporter.verify((err) => {
  if (err) console.error("SMTP verify failed:", err.message);
  else console.log("SMTP ready to send emails");
});

module.exports = async function sendEmail(to, subject, html) {
  try {
    await transporter.sendMail({
      from: `"CerviCare" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html,
    });
    console.log("✅ Email sent");
  } catch (error) {
    console.error("❌ Email sending failed:", error);
    throw error;
  }
};
