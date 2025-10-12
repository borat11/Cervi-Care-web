import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-toastify";
import { useState } from "react";
import { Menu, X } from "lucide-react"; // 🧩 For hamburger icons

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false); // ✅ Mobile menu toggle

  const navItems = {
    admin: [
      { path: "/", label: "Dashboard" },
      { path: "/awareness", label: "Awareness" },
      { path: "/diagnosis", label: "Diagnosis" },
      { path: "/manage-users", label: "Manage Users" },
      { path: "/reports", label: "Reports" },
      { path: "/adminfeedback", label: "Feedback" },

    ],
    user: [
      { path: "/", label: "Home" },
      { path: "/diagnosis", label: "Diagnosis" },
      { path: "/awareness", label: "Awareness" },
      { path: "/history", label: "History" },
      { path: "/feedback", label: "Feedback" },
    ],
  };

  const handleLogout = () => {
    logout();
    toast.info("Logged out successfully!");
    navigate("/");
  };

  const items = user ? navItems[user.role] || [] : [];

  return (
    <header className="bg-white shadow-md fixed top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
        {/* ============= LOGO ============= */}
        <Link
          to="/"
          className="text-2xl font-bold text-primary tracking-wide flex items-center gap-2"
        >
          <img
            src="https://cdn-icons-png.flaticon.com/512/7067/7067183.png"
            alt="logo"
            className="w-8 h-8"
          />
          CerviCare
        </Link>

        {/* ============= DESKTOP NAVIGATION ============= */}
        <nav className="hidden md:flex items-center space-x-6">
          {user ? (
            <>
              {items.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className="text-gray-700 hover:text-primary transition"
                >
                  {item.label}
                </Link>
              ))}
              <Link
                to="/profile"
                className="font-semibold text-primary hover:underline"
              >
                Profile
              </Link>
              <button
                onClick={handleLogout}
                className="border border-primary px-3 py-1 rounded-md hover:bg-primary hover:text-white transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-gray-700 hover:text-primary">
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

        {/* ============= MOBILE MENU ICON ============= */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-primary focus:outline-none"
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* ============= MOBILE DROPDOWN MENU ============= */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 shadow-md animate-fadeIn">
          <div className="flex flex-col items-center space-y-3 py-4">
            {user ? (
              <>
                {items.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className="text-gray-700 hover:text-primary transition"
                    onClick={() => setMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
                <Link
                  to="/profile"
                  onClick={() => setMenuOpen(false)}
                  className="font-semibold text-primary hover:underline"
                >
                  Profile
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setMenuOpen(false);
                  }}
                  className="border border-primary px-4 py-1 rounded-md hover:bg-primary hover:text-white transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => setMenuOpen(false)}
                  className="text-gray-700 hover:text-primary"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  onClick={() => setMenuOpen(false)}
                  className="bg-primary text-white px-5 py-2 rounded-full hover:bg-secondary transition"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
