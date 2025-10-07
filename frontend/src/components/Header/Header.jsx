import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-toastify";

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // ✅ Role-wise navigation items
  const navItems = {
    admin: [
      { path: "/", label: "Dashboard" },
      { path: "/manage-users", label: "Manage Users" },
      { path: "/reports", label: "Reports" },
    ],
    user: [
      { path: "/", label: "Home" },
      { path: "/diagnosis", label: "Diagnosis" },
      { path: "/awareness", label: "Awareness" },
      { path: "/feedback", label: "Feedback" },
    ],
  };

  // ✅ Logout Handler
  const handleLogout = () => {
    logout();
    toast.info("Logged out successfully!");
    navigate("/");
  };

  // ✅ Get role-based items safely
  const items = user ? navItems[user.role] || [] : [];

  return (
    <header className="flex justify-between items-center bg-white shadow-md px-8 py-4">
      {/* App Logo */}
      <Link to="/" className="text-2xl font-bold text-primary">
        CerviCare
      </Link>

      <nav className="flex items-center space-x-4">
        {/* ✅ Role-based Links */}
        {user ? (
          <>
            {items.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="text-gray-600 hover:text-primary transition"
              >
                {item.label}
              </Link>
            ))}

            {/* Profile */}
            <Link
              to="/profile"
              className="font-semibold text-primary hover:underline"
            >
              {user.name || "Profile"}
            </Link>

            {/* Logout */}
            <button
              onClick={handleLogout}
              className="ml-4 border border-primary px-3 py-1 rounded hover:bg-primary hover:text-white transition"
            >
              Logout
            </button>
          </>
        ) : (
          // ✅ When not logged in
          <>
            <Link to="/login" className="text-gray-600 hover:text-primary">
              Login
            </Link>
            <Link
              to="/register"
              className="bg-primary text-white px-4 py-2 rounded-full hover:bg-secondary transition"
            >
              Sign Up
            </Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
