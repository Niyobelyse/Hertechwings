import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";  // For redirection after logout
import { Book, ClipboardList, Home, FileText, Menu, X } from "lucide-react";

function Sidebar({ links, isOpen, toggleSidebar }) {
  const navigate = useNavigate();  // Hook for redirection

  const handleLogout = async () => {
    try {
      // Make a POST request to your backend to log out (e.g., invalidate the JWT token)
      const response = await fetch("http://127.0.0.1:8000/logout/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("access_token")}`, // Assuming token is stored in localStorage
        },
      });

      if (response.ok) {
        // Successfully logged out
        localStorage.removeItem("access_token");  // Remove JWT from localStorage
        navigate("/login");  // Redirect to login page
      } else {
        console.error("Logout failed:", response.statusText);
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <div className={`fixed top-0 left-0 h-full w-64 bg-black text-white p-6 flex flex-col justify-between transition-transform transform ${isOpen ? "translate-x-0" : "-translate-x-full"} md:relative md:translate-x-0`}>
      {/* Close Button */}
      <div className="flex justify-end md:hidden">
        <button onClick={toggleSidebar} className="text-white">
          <X size={24} />
        </button>
      </div>
      {/* Navigation Links */}
      <ul className="space-y-4 flex-grow mt-6">
        {links.map((link, index) => (
          <li key={index}>
            <a href={link.href} className="flex items-center text-white hover:bg-pink-600 p-3 rounded-md">
              {link.icon}
              <span className="ml-3">{link.text}</span>
            </a>
          </li>
        ))}
      </ul>
      {/* Logout Button */}
      <button 
        onClick={handleLogout} 
        className="w-full bg-pink-500 hover:bg-pink-600 text-white py-2 rounded-md mt-auto"
      >
        Logout
      </button>
    </div>
  );
}

export default function MentorDashboard() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleSidebar = () => setIsOpen(!isOpen);

  const mentorLinks = [
    { href: "/mentordashboard/courses", text: "Course Management", icon: <Book /> },
    { href: "/mentordashboard/assignments", text: "Assignments Management", icon: <ClipboardList /> },
    { href: "/mentordashboard/course-resources", text: "Course Resources Management", icon: <FileText /> },
  ];

  return (
    <div className="flex h-screen bg-white">
      {/* Sidebar */}
      <Sidebar links={mentorLinks} isOpen={isOpen} toggleSidebar={toggleSidebar} />
      
      {/* Main Content */}
      <div className="flex-1 p-6 md:ml-64 transition-all duration-300">
        {/* Toggler for small screens */}
        <button onClick={toggleSidebar} className="md:hidden text-black mb-4">
          <Menu size={28} />
        </button>
        <Outlet />
      </div>
    </div>
  );
}
