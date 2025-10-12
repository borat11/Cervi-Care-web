import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-toastify";
import API from "../../api/api";
import { Eye, EyeOff, Mail, Shield, Lock } from "lucide-react";

const Profile = () => {
  const { user } = useAuth();
  const [showPassword, setShowPassword] = useState({ old: false, new: false });
  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
  });
  const [showChangeForm, setShowChangeForm] = useState(false);

  if (!user)
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-600 text-lg">
        Please log in to view your profile.
      </div>
    );

  // Handle input
  const handleChange = (e) =>
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value });

  // Handle password update
  const handlePasswordChange = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/change-password", passwordData, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      toast.success(res.data.message || "Password updated successfully!");
      setPasswordData({ oldPassword: "", newPassword: "" });
      setShowChangeForm(false);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update password");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-purple-50 to-white px-4">
      <div className="max-w-lg w-full bg-white shadow-xl rounded-2xl p-8 border border-gray-100">
        {/* Profile Header */}
        <div className="text-center mb-6">
          <img
            src="https://cdn-icons-png.flaticon.com/512/9131/9131529.png"
            alt="profile"
            className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-primary"
          />
          <h2 className="text-2xl font-semibold text-primary">
            Welcome, {user.name}
          </h2>
          <p className="text-gray-500 text-sm mt-1 capitalize">{user.role==="user"?"Patient":""}</p>
        </div>

        {/* Profile Details */}
        <div className="bg-gray-50 p-4 rounded-lg mb-6">
          <div className="flex items-center gap-2 text-gray-700 mb-2">
            <Mail size={18} className="text-primary" />
            <span>{user.email}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-700">
            <Shield size={18} className="text-primary" />
            <span>Role: {user.role==="user"?"Patient":""}</span>
          </div>
        </div>

        {/* Toggle Button */}
        <button
          onClick={() => setShowChangeForm(!showChangeForm)}
          className="w-full flex items-center justify-center gap-2 bg-primary text-white py-2 rounded-md hover:bg-purple-700 transition"
        >
          <Lock size={18} />
          {showChangeForm ? "Cancel" : "Change Password"}
        </button>

        {/* Conditional Password Form */}
        {showChangeForm && (
          <form
            onSubmit={handlePasswordChange}
            className="space-y-4 mt-6 border-t pt-4 animate-fadeIn"
          >
            {/* Old Password */}
            <div className="relative">
              <input
                type={showPassword.old ? "text" : "password"}
                name="oldPassword"
                placeholder="Current Password"
                value={passwordData.oldPassword}
                onChange={handleChange}
                required
                className="w-full border rounded-md p-2 pr-10 focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <span
                onClick={() =>
                  setShowPassword((prev) => ({ ...prev, old: !prev.old }))
                }
                className="absolute right-3 top-2.5 text-gray-500 cursor-pointer"
              >
                {showPassword.old ? <EyeOff size={18} /> : <Eye size={18} />}
              </span>
            </div>

            {/* New Password */}
            <div className="relative">
              <input
                type={showPassword.new ? "text" : "password"}
                name="newPassword"
                placeholder="New Password"
                value={passwordData.newPassword}
                onChange={handleChange}
                required
                className="w-full border rounded-md p-2 pr-10 focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <span
                onClick={() =>
                  setShowPassword((prev) => ({ ...prev, new: !prev.new }))
                }
                className="absolute right-3 top-2.5 text-gray-500 cursor-pointer"
              >
                {showPassword.new ? <EyeOff size={18} /> : <Eye size={18} />}
              </span>
            </div>

            <button
              type="submit"
              className="w-full bg-primary text-white py-2 rounded-md hover:bg-purple-700 transition"
            >
              Update Password
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Profile;
