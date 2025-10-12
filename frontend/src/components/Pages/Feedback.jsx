import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import API from "../../api/api";

const Feedback = () => {
  const [rating, setRating] = useState(0);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await API.post("/feedback/createFeedback", { rating, message });
      toast.success("Feedback submitted!");
      setRating(0);
      setMessage("");
    } catch (error) {
      toast.error("Failed to submit feedback");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 bg-white p-6 rounded-2xl shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center text-primary">
        Share Your Feedback 💬
      </h2>

      <form onSubmit={handleSubmit}>
        <label className="block text-gray-600 mb-2">Rating (1–5)</label>
        <input
          type="number"
          min="1"
          max="5"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          className="border w-full px-3 py-2 rounded mb-4"
        />

        <label className="block text-gray-600 mb-2">Message</label>
        <textarea
          rows="4"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="border w-full px-3 py-2 rounded mb-4"
        ></textarea>

        <button
          type="submit"
          className="bg-primary text-white px-4 py-2 rounded hover:bg-secondary transition w-full"
        >
          Submit Feedback
        </button>
      </form>
    </div>
  );
};

export default Feedback;
