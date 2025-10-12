import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const AdminFeedback = () => {
  const [feedbacks, setFeedbacks] = useState([]);

  const fetchFeedbacks = async () => {
    try {
      const token = localStorage.getItem("token");
      const { data } = await axios.get("http://localhost:5000/api/feedback", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setFeedbacks(data.feedbacks);
    } catch {
      toast.error("Failed to load feedbacks");
    }
  };

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  return (
    <div className="max-w-5xl mx-auto mt-10">
      <h2 className="text-3xl font-bold text-primary text-center mb-6">
        All User Feedbacks
      </h2>
      <div className="grid gap-6">
        {feedbacks.map((f) => (
          <div
            key={f._id}
            className="bg-white shadow-md rounded-xl p-5 border border-gray-100"
          >
            <p className="text-gray-800 font-semibold">
              {f.name} ({f.email})
            </p>
            <p className="text-yellow-600">⭐ {f.rating}/5</p>
            <p className="mt-2 text-gray-700">{f.message}</p>
            {f.reply?.text ? (
              <p className="mt-3 text-sm text-green-600">
                💬 Admin Reply: {f.reply.text}
              </p>
            ) : (
              <p className="mt-3 text-sm text-gray-500">No reply yet</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminFeedback;
