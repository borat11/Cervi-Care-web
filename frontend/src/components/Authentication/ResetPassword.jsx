import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Eye, EyeOff } from "lucide-react";
import Lottie from "lottie-react";
import resetAnim from "../../assets/resetPassword";
import API from "../../api/api";
import { useAuth } from "../../context/AuthContext";

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
const { user } = useAuth();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post(`/auth/reset-password/${token}`, { password });
      toast.success(res.data.message || "Password reset successful!");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      toast.error(err.response?.data?.message || "Password reset failed");
    }
  };

  if (user)
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-600 text-lg">
        Please Logout 
      </div>
    );

  return (
    <div className="flex flex-col md:flex-row items-center justify-center min-h-screen">
      {/* 🩺 Lottie Animation — Top (mobile) / Right (desktop) */}
      <div className="w-full md:w-1/2 flex justify-center items-center mb-6 md:mb-0 order-first md:order-last">
        <Lottie animationData={resetAnim} loop={true} className="w-3/4 h-auto" />
      </div>

      {/* 🔐 Reset Password Form */}
      <div className="w-full md:w-1/2 px-8 md:p-12">
        <h2 className="text-3xl text-center text-primary mb-6 font-bold">
          Reset Password
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Password Input with Toggle */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border p-2 w-full rounded pr-10"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-primary text-white py-2 rounded hover:bg-secondary transition"
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
