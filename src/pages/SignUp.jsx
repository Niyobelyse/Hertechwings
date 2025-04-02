import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import axios from "axios";
import Footer from "../components/Footer";
import Header from "../components/Header";

export default function SignUpPage() {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    password: "",
    role: "",
  });

  const [message, setMessage] = useState("");
  const navigate = useNavigate(); // Initialize navigation function

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const response = await axios.post("http://127.0.0.1:8000/register/", formData, {
        headers: { "Content-Type": "application/json" },
      });

      setMessage("Registration successful! Redirecting to OTP verification...");
      
      // Redirect to OTP verification page
      navigate("/verifyotp", { state: { email: formData.email } });

    } catch (error) {
      if (error.response) {
        setMessage(error.response.data?.error || "Something went wrong. Please try again.");
      } else if (error.request) {
        setMessage("No response from server. Check your internet connection.");
      } else {
        setMessage("An error occurred. Please try again.");
      }
    }
  };

  return (
    <>
      <Header />
      <div className="flex flex-col md:flex-row min-h-screen">
        <div className="w-full md:w-1/2 p-6 md:p-12 flex flex-col justify-center">
          <div className="max-w-md mx-auto w-full">
            <h1 className="text-4xl font-bold mb-4 text-gray-900">Sign Up</h1>

            {message && (
              <p className={`text-center ${message.includes("successful") ? "text-green-500" : "text-red-500"}`}>
                {message}
              </p>
            )}

            <form onSubmit={handleSubmit}>
              {/* First Name */}
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">First Name</label>
                <input
                  name="first_name"
                  type="text"
                  placeholder="First Name"
                  className="w-full rounded-lg px-4 py-3 border border-gray-300 focus:ring-2 focus:ring-black"
                  value={formData.first_name}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Last Name */}
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Last Name</label>
                <input
                  name="last_name"
                  type="text"
                  placeholder="Last Name"
                  className="w-full rounded-lg px-4 py-3 border border-gray-300 focus:ring-2 focus:ring-black"
                  value={formData.last_name}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Email */}
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Email</label>
                <input
                  name="email"
                  type="email"
                  placeholder="Your Email Address"
                  className="w-full rounded-lg px-4 py-3 border border-gray-300 focus:ring-2 focus:ring-black"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Phone */}
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Phone</label>
                <input
                  name="phone"
                  type="text"
                  placeholder="Your Phone Number"
                  className="w-full rounded-lg px-4 py-3 border border-gray-300 focus:ring-2 focus:ring-black"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Password */}
              <div className="mb-6">
                <label className="block text-gray-700 mb-2">Password</label>
                <input
                  name="password"
                  type="password"
                  placeholder="Your Password"
                  className="w-full rounded-lg px-4 py-3 border border-gray-300 focus:ring-2 focus:ring-black"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Role Selection */}
              <div className="mb-6">
                <label className="block text-gray-700 mb-2">Role</label>
                <select
                  name="role"
                  className="w-full rounded-lg px-4 py-3 border border-gray-300"
                  value={formData.role}
                  onChange={handleChange}
                  required
                >
                  <option value="" disabled>Select your role</option>
                  <option value="student">student</option>
                  <option value="mentor">mentor</option>
                </select>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full rounded-lg py-3 bg-gradient-to-r from-yellow-400 via-orange-400 to-pink-500 text-white font-semibold hover:opacity-90"
              >
                Sign Up
              </button>
            </form>

            {/* Login Link */}
            <p className="text-center mt-4 text-gray-700">
              Do you have an account?{" "}
              <Link to="/login" className="text-pink-500 hover:underline">
                Sign In
              </Link>
            </p>
          </div>
        </div>

        {/* Right Side Design */}
        <div className="hidden md:flex w-1/2 bg-gradient-to-b from-pink-400 to-orange-300 p-12 items-center justify-center relative overflow-hidden">
          {/* Decorative Shapes */}
          <div className="absolute top-20 right-20 w-12 h-12 border-2 border-white opacity-20 rotate-45"></div>
          <div className="absolute bottom-40 left-20 w-8 h-8 border-2 border-white opacity-20 rotate-12"></div>
          <div className="absolute top-1/3 left-1/4 w-4 h-4 bg-white opacity-20 rounded-full"></div>

          <div className="relative z-10 text-center">
            <h2 className="text-white text-4xl font-bold mb-8 max-w-md">Turn your ideas into reality</h2>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
