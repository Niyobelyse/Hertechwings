import React, { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { Book, ClipboardList, Home, FileText, Menu, X } from "lucide-react";

function Sidebar({ links, isOpen, toggleSidebar }) {
  const navigate = useNavigate(); // Hook for programmatic navigation

  const handleLogout = () => {
    // Perform logout actions here (e.g., clearing auth tokens, calling API)
    navigate("/"); // Redirect to home page
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
            <Link to={link.href} className="flex items-center text-white hover:bg-pink-600 p-3 rounded-md">
              {link.icon}
              <span className="ml-3">{link.text}</span>
            </Link>
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
