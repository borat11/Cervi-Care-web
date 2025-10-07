const jwt = require("jsonwebtoken");
const User = require("../../models/user");

const verifyController = async (req, res) => {
  try {
    const token = req.params.token;
    if (!token)
      return res
        .status(400)
        .send(renderMessage("Invalid verification link", "error"));

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user)
      return res.status(404).send(renderMessage("User not found", "error"));

    if (user.isVerified) {
      return res.send(renderMessage("Your email is already verified.", "info"));
    }

    user.isVerified = true;
    await user.save();

    res.send(renderMessage("✅ Email Verified Successfully!", "success"));
  } catch (err) {
    console.error(err);
    res
      .status(400)
      .send(renderMessage("Invalid or Expired Verification Link!", "error"));
  }
};

// 💜 Elegant design using your Tailwind-style palette
function renderMessage(message, type = "info") {
  const colors = {
    success: "#7B1FA2", // Primary Purple
    error: "", // Deep accent for errors
    info: "#9575CD", // Softer violet for neutral info
  };
  const color = colors[type] || "#7B1FA2";

  return `
    <div style="
      font-family: 'Poppins', 'Segoe UI', Arial, sans-serif;
      background: linear-gradient(135deg, #F3E5F5, #E1BEE7);
      height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
    ">
      <div style="
        background: white;
        padding: 50px 60px;
        border-radius: 20px;
        box-shadow: 0 8px 25px rgba(123, 31, 162, 0.15);
        text-align: center;
        max-width: 480px;
        animation: fadeIn 0.6s ease-in-out;
      ">
        <h2 style="color: ${color}; margin-bottom: 15px; font-size: 24px;">
          ${message}
        </h2>
        <p style="color: #666; font-size: 15px;">
          You can now close this tab or return to the application.
        </p>
        <a href="http://localhost:5173/login" 
           style="display:inline-block;margin-top:25px;
           background:${color};color:white;padding:12px 30px;
           text-decoration:none;border-radius:10px;
           font-weight:600;transition:background 0.3s;">
           Go to Login
        </a>
      </div>
      <style>
        @keyframes fadeIn {
          from {opacity: 0; transform: translateY(20px);}
          to {opacity: 1; transform: translateY(0);}
        }
        a:hover { background: #9C27B0 !important; }
      </style>
    </div>
  `;
}

module.exports = verifyController;
