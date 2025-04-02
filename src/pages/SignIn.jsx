import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; 
import Footer from "../components/Footer";
import Header from "../components/Header";

export default function LoginPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const response = await axios.post("http://127.0.0.1:8000/login/", formData, {
        headers: { "Content-Type": "application/json" },
      });

      const { access_token, role } = response.data;
      localStorage.setItem("access_token", access_token);

      setMessage("Login successful!");

      switch (role) {
        case "student":
          navigate("/learnerdashboard");
          break;
        case "mentor":
          navigate("/mentordashboard");
          break;
        default:
          navigate("/dashboard");
          break;
      }
    } catch (error) {
      if (error.response) {
        setMessage(error.response.data?.error || "Invalid credentials. Please try again.");
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
            <h1 className="text-4xl font-bold mb-4 text-gray-900">Sign In</h1>

            {message && (
              <p className={`text-center ${message.includes("successful") ? "text-green-500" : "text-red-500"}`}>
                {message}
              </p>
            )}

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Email Address</label>
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

              <div className="mb-2">
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

              <p className="text-right text-gray-600 text-sm mb-4">
                <a href="/forgot-password" className="text-pink-500 hover:underline">
                  Forgot Password?
                </a>
              </p>

              <button
                type="submit"
                className="w-full rounded-lg py-3 bg-gradient-to-r from-yellow-400 via-orange-400 to-pink-500 text-white font-semibold hover:opacity-90"
              >
                Sign In
              </button>
            </form>

            <p className="text-center mt-6 text-gray-600">
              Don't have an account?{" "}
              <a href="/signup" className="text-pink-500 font-medium hover:underline">
                Sign up
              </a>
            </p>
          </div>
        </div>

        <div className="hidden md:flex w-1/2 bg-gradient-to-b from-pink-400 to-orange-300 p-12 items-center justify-center relative overflow-hidden">
          <div className="absolute top-20 right-20 w-12 h-12 border-2 border-white opacity-20 rotate-45"></div>
          <div className="absolute bottom-40 left-20 w-8 h-8 border-2 border-white opacity-20 rotate-12"></div>
          <div className="absolute top-1/3 left-1/4 w-4 h-4 bg-white opacity-20 rounded-full"></div>

          <div className="relative z-10 text-center">
            <h2 className="text-white text-4xl font-bold mb-8 max-w-md"> Welcome Back to HerTechWings!</h2>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
