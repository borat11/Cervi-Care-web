const express = require("express");
const authMiddleware = require("../../middleware/authMiddleware");
const adminOnly = require("../../middleware/adminOnly");
const { createFeedback, getAllFeedbacks, getUserFeedbacks, replyFeedback } = require("../../controller/feedback/feedbackController");

const router = express.Router();


router.post("/createFeedback", authMiddleware, createFeedback);
router.get("/adminAllFeedback", authMiddleware, adminOnly, getAllFeedbacks);
router.get("/my", authMiddleware, getUserFeedbacks);
router.put("/:id/reply", authMiddleware, adminOnly, replyFeedback);

module.exports = router;
