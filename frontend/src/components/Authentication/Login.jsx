import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import API from "../../api/api"; // axios instance

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/login", formData);

      // ✅ Save token + user info
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      toast.success("Login successful!");
      navigate("/"); // Redirect to home
    } catch (err) {
      console.error("Login error:", err);

      // If backend says email not verified
      const msg = err.response?.data?.message;
      if (msg === "Please verify your email before login") {
        toast.info("Please verify your email. Click 'Resend Verification' below.");
      } else {
        toast.error(msg || "Invalid credentials");
      }
    }
  };

  // Handle resend verification email
  const handleResendVerification = async () => {
    try {
      const email = formData.email;
      if (!email) return toast.error("Enter your email first!");
      const res = await API.post("/auth/resend-verification", { email });
      toast.success(res.data.message);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to resend verification");
    }
  };

  return (
    <div className="max-w-sm mx-auto mt-10">
      <h2 className="text-xl text-center text-primary mb-6">Login</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full border p-2 rounded"
          onChange={handleChange}
          value={formData.email}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full border p-2 rounded"
          onChange={handleChange}
          value={formData.password}
          required
        />

        {/* 🔁 Resend Verification Button */}
        <button
          type="button"
          onClick={handleResendVerification}
          className="text-sm text-primary underline hover:cursor-pointer "
        >
          Resend verification email
        </button>

        <button
          type="submit"
          className="w-full bg-primary text-white py-2 rounded hover:bg-secondary transition"
        >
          Login
        </button>

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
  );
};

export default Login;
