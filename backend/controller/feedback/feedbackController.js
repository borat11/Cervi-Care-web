// feedbackController.js
const Feedback = require("../../models/Feedback");

// ✅ Create new feedback
const createFeedback = async (req, res) => {
  try {
    const { rating, message } = req.body;
    const user = req.user;

    const feedback = await Feedback.create({
      user: user._id,
      name: user.name,
      email: user.email,
      rating,
      message,
    });

    res.status(201).json({ success: true, feedback });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// ✅ Get all feedbacks (for admin)
const getAllFeedbacks = async (req, res) => {
  try {
    const feedbacks = await Feedback.find().populate("user", "name email");
    res.json({ success: true, feedbacks });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// ✅ Get user’s own feedbacks
const getUserFeedbacks = async (req, res) => {
  try {
    const feedbacks = await Feedback.find({ user: req.user._id });
    res.json({ success: true, feedbacks });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// ✅ Admin reply to feedback
const replyFeedback = async (req, res) => {
  try {
    const { id } = req.params;
    const { text } = req.body;

    const feedback = await Feedback.findById(id);
    if (!feedback) return res.status(404).json({ message: "Feedback not found" });

    feedback.reply = { text, repliedAt: new Date() };
    await feedback.save();

    res.json({ success: true, feedback });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// ✅ Delete feedback
const deleteFeedback = async (req, res) => {
  try {
    const { id } = req.params;
    const feedback = await Feedback.findById(id);
    if (!feedback) return res.status(404).json({ message: "Feedback not found" });

    if (req.user.role !== "admin" && !feedback.user.equals(req.user._id)) {
      return res.status(403).json({ message: "Not authorized to delete this feedback" });
    }

    await feedback.deleteOne();
    res.json({ success: true, message: "Feedback deleted" });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// ✅ Export all functions
module.exports = {
  createFeedback,
  getAllFeedbacks,
  getUserFeedbacks,
  replyFeedback,
  deleteFeedback,
};
