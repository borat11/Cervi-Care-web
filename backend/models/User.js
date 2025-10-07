const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,  
    },
    email: {
      type: String,
      required: true,  
      unique: true,
    },
    password: {
      type: String,
      required: true, 
      minlength: 6,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    isVerified: {
  type: Boolean,
  default: false,
},
 resetPasswordToken: { type: String, default: null },      // sha256 hash
    resetPasswordExpires: { type: Date, default: null },       // expiry time
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
