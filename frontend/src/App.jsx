import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Layout from "./components/Layout/Layout";
import Register from "./components/Authentication/Register";
import Login from "./components/Authentication/Login";
import ForgotPassword from "./components/Authentication/ForgotPassword";
import ResetPassword from "./components/Authentication/ResetPassword";
import VerifyEmail from "./components/Authentication/VerifyEmail";
import { AuthProvider } from "./context/AuthContext";
import Header from "./components/Header/Header";
import Home from "./components/Pages/Home";
import Profile from "./components/Pages/Profile";

function App() {
  return (
  <AuthProvider>
    <Router>
      <ToastContainer position="top-center" />
      <Header/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/register" element={<Layout><Register /></Layout>} />
        <Route path="/login" element={<Layout><Login /></Layout>} />
        <Route path="/forgot-password" element={<Layout><ForgotPassword /></Layout>} />
        <Route path="/reset-password/:token" element={<Layout><ResetPassword /></Layout>} />
        <Route path="/verify/:token" element={<Layout><VerifyEmail /></Layout>} />
      </Routes>
    </Router>
  </AuthProvider>
  );
}

export default App;
