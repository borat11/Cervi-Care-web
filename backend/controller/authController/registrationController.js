const User = require("../../models/user");
const bcrypt = require("bcryptjs");
const { generateToken } = require("../../helper/jwtHelper");
const jwt = require("jsonwebtoken");
const sendEmail = require("../../helper/emailSender");

const registrationController = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({ name, email, password: hashedPassword, role });
    await user.save();

    // Generate JWT for login (optional)
    const token = generateToken({ id: user._id, role: user.role });

    // Email verification token
    const verifyToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
    const verifyUrl = `http://localhost:8000/api/auth/verify/${verifyToken}`;

    // Send Email
    await sendEmail(
  email,
  "CerviCare - Email Verification Required",
  `
  <div style="font-family: Arial, sans-serif; background:#f7f9fc; padding:20px; color:#333;">
    <div style="max-width:600px; margin:0 auto; background:#fff; padding:20px; border-radius:10px; box-shadow:0 4px 10px rgba(0,0,0,0.1);">
      
      <h2 style="text-align:center; color:#e63946;">🔬 CerviCare Diagnostic Platform</h2>
      
      <p>Dear <strong>${name}</strong>,</p>
      
      <p>We have successfully received your registration request on <b>CerviCare</b>, our AI-powered 
      cervical cancer detection platform.</p>

      <div style="background:#ffe6e6; padding:15px; border-radius:8px; margin:20px 0; border:1px solid #f5b7b1;">
        <p style="margin:0; font-size:14px; line-height:1.6;">
          🧬 <b>Important Step:</b>  
          To ensure the accuracy of your diagnostic access and protect sensitive medical data, 
          please verify your email address.
        </p>
      </div>

      <p style="text-align:center; margin:30px 0;">
        <a href="${verifyUrl}" 
           style="background:#e63946; color:#fff; text-decoration:none; 
                  padding:12px 20px; border-radius:8px; font-size:16px;">
          ✅ Verify My Email
        </a>
      </p>

      <p>If the button above does not work, copy & paste this link into your browser:</p>
      <p style="word-break:break-all; font-size:13px; color:#555;">${verifyUrl}</p>

      <hr style="margin:30px 0;">

      <p style="font-size:12px; color:#777;">
        This verification helps us provide you with secure access to <b>diagnostic tools, reports, and AI-based cervical cancer risk assessment</b>.  
        If you did not sign up for CerviCare, please ignore this message.
      </p>

      <p style="text-align:center; font-size:12px; color:#999;">
        © ${new Date().getFullYear()} CerviCare | Early Detection Saves Lives
      </p>
    </div>
  </div>
  `
);


    // ✅ Only ONE response
    res.status(201).json({
      message: "User registered successfully. Please check your email to verify.",
      token,
      user: { id: user._id, name: user.name, email: user.email, role: user.role }
    });

  } catch (err) {
    console.error("Registration Error:", err);
    res.status(500).json({ error: err.message });
  }
};

module.exports = registrationController;
