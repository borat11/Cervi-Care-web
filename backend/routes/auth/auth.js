const express = require("express");
const registrationController = require("../../controller/authController/registrationController");
const loginController = require("../../controller/authController/loginController");
const verifyController = require("../../controller/authController/verifyController");
const resendVerificationController = require("../../controller/authController/resendVerificationController");
const forgotPasswordController = require("../../controller/authController/forgotPasswordController");
const resetPasswordController = require("../../controller/authController/resetPasswordController");
const changePasswordController = require("../../controller/authController/changePasswordController");
const authMiddleware = require("../../middleware/authMiddleware");


const router = express.Router();

// ✅ Register
router.post("/register",registrationController );

// ✅ Login
router.post("/login",loginController);

// ✅ Verify email route
router.get("/verify/:token",verifyController );

// ✅ resend verification mail
router.post("/resend-verification", resendVerificationController);

// ✅ forgot password (send reset mail)
router.post("/forgot-password", forgotPasswordController);

// ✅ reset password
router.post("/reset-password/:token", resetPasswordController);

// ✅ protected route for logged-in user
router.post("/change-password", authMiddleware, changePasswordController);


module.exports = router;
