import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function ForgotPasswordPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const response = await axios.post("http://127.0.0.1:8000/request-password-reset/", { email });
      setMessage(response.data.message);

      // Redirect to reset password page after OTP is sent
      navigate("/reset-password", { state: { email } });
    } catch (error) {
      setMessage("Failed to send OTP. Please try again.");
    }
  };

  return (
    <>
      <Header />
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-full max-w-md p-8 bg-white shadow-md rounded-md">
          <h2 className="text-2xl font-bold mb-4">Forgot Password</h2>
          {message && <p className="text-center text-green-500">{message}</p>}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700">Email Address</label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-pink-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-pink-500 text-white py-2 rounded-lg hover:bg-pink-600"
            >
              Request OTP
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}
