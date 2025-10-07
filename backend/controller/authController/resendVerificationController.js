const jwt = require("jsonwebtoken");
const User = require("../../models/user");
const sendEmail = require("../../helper/emailSender");

const resendVerificationController = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: "Email is required" });

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });
    if (user.isVerified) return res.status(400).json({ message: "Email already verified" });

    const verifyToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
    const verifyUrl = `http://localhost:${process.env.PORT || 8000}/api/auth/verify/${verifyToken}`;

    await sendEmail(
      email,
      "CerviCare - Verify Your Email (Resend)",
      `
      <div style="font-family:Arial;background:#f7f9fc;padding:20px;">
        <div style="max-width:600px;margin:auto;background:#fff;padding:20px;border-radius:10px;">
          <h2 style="text-align:center;color:#e63946;">🔬 CerviCare – Email Verification</h2>
          <p>Hello <b>${user.name}</b>,</p>
          <p>Please verify your email to access diagnostic tools.</p>
          <p style="text-align:center;margin:24px 0;">
            <a href="${verifyUrl}" style="background:#e63946;color:#fff;padding:12px 18px;border-radius:8px;text-decoration:none;">Verify My Email</a>
          </p>
          <p style="font-size:12px;color:#666;">If you didn’t request this, please ignore.</p>
        </div>
      </div>`
    );

    return res.json({ message: "Verification email resent. Please check your inbox." });
  } catch (err) {
    console.error("Resend verification error:", err);
    return res.status(500).json({ error: err.message });
  }
};
module.exports = resendVerificationController;