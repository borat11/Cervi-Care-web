import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Lottie from "lottie-react";
import loginAnimation from "../../assets/loginAnimation"; // Ensure you have a login animation JSON
import { Eye, EyeOff } from "lucide-react";
import API from "../../api/api"; // axios instance

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/login", formData);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      toast.success("Login successful!");
      window.location.href = "/";
    } catch (err) {
      const msg = err.response?.data?.message;
      if (msg === "Please verify your email before login") {
        toast.info("Please verify your email. Click 'Resend Verification' below.");
      } else {
        toast.error(msg || "Invalid credentials");
      }
    }
  };

  const handleResendVerification = async () => {
    try {
      const { email } = formData;
      if (!email) return toast.error("Enter your email first!");
      const res = await API.post("/auth/resend-verification", { email });
      toast.success(res.data.message);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to resend verification");
    }
  };

  return (
    <div className="flex flex-col md:flex-row  items-center justify-center mt-10 md:mt-20">
      {/* 🩺 Lottie Animation — Top on mobile, right on desktop */}
       <div className=" md:w-1/2 flex justify-center items-center mb-2 md:mb-0 order-first md:order-last">
    <Lottie animationData={loginAnimation} loop={true} className="w-3/4 h-auto" />
  </div>

      {/* 💡 Login Form */}
  <div className="w-full md:w-1/2 px-8 mb-16 md:p-8">
        <h2 className="text-3xl text-center text-primary mb-6 font-bold">
          Login
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div>
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="w-full border p-2 rounded"
              onChange={handleChange}
              value={formData.email}
              required
            />
          </div>

          {/* Password */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              className="w-full border p-2 rounded pr-10"
              onChange={handleChange}
              value={formData.password}
              required
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-2.5 text-gray-500 cursor-pointer"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </span>
          </div>

          {/* Resend verification */}
          <button
            type="button"
            onClick={handleResendVerification}
            className="text-sm text-primary underline"
          >
            Resend verification email
          </button>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-primary text-white py-2 rounded hover:bg-secondary transition"
          >
            Login
          </button>

          {/* Links */}
          <div className="flex justify-between text-sm mt-2">
            <Link to="/forgot-password" className="text-primary hover:underline">
              Forgot password?
            </Link>
            <Link to="/register" className="text-primary hover:underline">
              Create account
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
