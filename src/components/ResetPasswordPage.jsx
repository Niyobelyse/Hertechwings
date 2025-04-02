import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function ResetPasswordPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    otp: "",
    new_password: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const response = await axios.post("https://belyse.pythonanywhere.com//reset-password/", formData);
      setMessage(response.data.message);
      navigate("/login"); // Redirect to login after success
    } catch (error) {
      setMessage("Password reset failed. Check your OTP and try again.");
    }
  };

  return (
    <>
      <Header />
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-full max-w-md p-8 bg-white shadow-md rounded-md">
          <h2 className="text-2xl font-bold mb-4">Reset Password</h2>
          {message && <p className="text-center text-green-500">{message}</p>}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-pink-500"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">OTP</label>
              <input
                type="text"
                name="otp"
                placeholder="Enter OTP"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-pink-500"
                value={formData.otp}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">New Password</label>
              <input
                type="password"
                name="new_password"
                placeholder="Enter new password"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-pink-500"
                value={formData.new_password}
                onChange={handleChange}
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-pink-500 text-white py-2 rounded-lg hover:bg-pink-600"
            >
              Reset Password
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}
