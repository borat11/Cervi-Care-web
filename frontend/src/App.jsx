import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Register from "./components/Authentication/Register";
import Login from "./components/Authentication/Login";
import ForgotPassword from "./components/Authentication/ForgotPassword";
import ResetPassword from "./components/Authentication/ResetPassword";
import VerifyEmail from "./components/Authentication/VerifyEmail";
import Header from "./components/Header/Header";
import Home from "./components/Pages/Home";
import Profile from "./components/Pages/Profile";
import Footer from "./components/Footer/Footer";
import Awareness from "./components/Pages/Awareness";
import Feedback from "./components/Pages/Feedback";
import ProtectedRoute from "./components/ProtectedRotes/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";
import Diagnosis from "./components/Pages/Diagnosis";
// (Optional) Example admin page
// import AdminDashboard from "./components/Admin/AdminDashboard";

function App() {
  return (
    <AuthProvider>
      <Router>
        {/* Toast for Notifications */}
        <ToastContainer position="top-center" />

        <div className="flex flex-col min-h-screen">
          <Header />

          <main className="flex-grow">
            <Routes>
              {/* 🌍 Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/reset-password/:token" element={<ResetPassword />} />
              <Route path="/verify/:token" element={<VerifyEmail />} />

              {/* 🔒 Protected Routes — User or Admin must be logged in */}
              <Route element={<ProtectedRoute allowedRoles={["user"]} />}>
                <Route path="/profile" element={<Profile />} />
                <Route path="/awareness" element={<Awareness />} />
                <Route path="/feedback" element={<Feedback />} />
                <Route path="/diagnosis" element={<Diagnosis />} />

              </Route>

              {/* 🔐 Admin Only Routes */}
              <Route element={<ProtectedRoute allowedRoles={["Admin"]} />}>
                {/* <Route path="/admin/dashboard" element={<AdminDashboard />} /> */}
              </Route>
            </Routes>
          </main>

          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
