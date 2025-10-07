const crypto = require("crypto");
const User = require("../../models/user");
const sendEmail = require("../../helper/emailSender");

const forgotPasswordController = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: "Email is required" });

    const user = await User.findOne({ email });
    if (!user)
      return res.status(200).json({ message: "If this email exists, a reset link has been sent." });

    // ✅ Generate reset token (raw + hashed)
    const resetTokenRaw = crypto.randomBytes(32).toString("hex");
    const resetTokenHashed = crypto.createHash("sha256").update(resetTokenRaw).digest("hex");

    user.resetPasswordToken = resetTokenHashed;
    user.resetPasswordExpires = Date.now() + 15 * 60 * 1000; // 15 min expiry
    await user.save();

    // ✅ FRONTEND URL (for React App)
    const resetUrl = `http://localhost:5173/reset-password/${resetTokenRaw}`;

    // ✅ Beautiful HTML email
    const emailHTML = `
      <div style="font-family:Arial, sans-serif;background:#f7f9fc;padding:20px;">
        <div style="max-width:600px;margin:auto;background:#fff;padding:25px;border-radius:10px;">
          <h2 style="text-align:center;color:#e63946;">🩺 CerviCare – Password Reset</h2>
          <p>Hello <b>${user.name}</b>,</p>
          <p>We received a request to reset your password for <b>CerviCare</b>.</p>
          <p>Click the button below to set a new password. This link will expire in 15 minutes.</p>
          <p style="text-align:center;margin:24px 0;">
            <a href="${resetUrl}" style="background:#e63946;color:#fff;padding:12px 20px;border-radius:8px;text-decoration:none;">Reset My Password</a>
          </p>
          <p style="font-size:13px;color:#555;">If you didn’t request this, just ignore this email.</p>
          <hr style="margin:20px 0;border:none;border-top:1px solid #ddd;" />
          <p style="text-align:center;font-size:12px;color:#999;">© ${new Date().getFullYear()} CerviCare Diagnostics</p>
        </div>
      </div>
    `;

    await sendEmail(user.email, "CerviCare – Password Reset Request", emailHTML);

    return res.json({ message: "If this email exists, a reset link has been sent." });
  } catch (err) {
    console.error("Forgot password error:", err);
    return res.status(500).json({ error: err.message });
  }
};

module.exports = forgotPasswordController;
