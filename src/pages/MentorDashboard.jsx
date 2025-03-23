import React, { useState } from "react";
import { Book, ClipboardList, Home, Mail, User, Video, Menu, X } from "lucide-react";

function Sidebar({ links, title, isOpen, toggleSidebar }) {
  return (
    <div className={`fixed top-0 left-0 h-full bg-black text-white p-6 flex flex-col justify-between transition-transform transform ${isOpen ? "translate-x-0" : "-translate-x-full"} md:relative md:translate-x-0 md:w-64`}>
      <div className="">
      
        <button onClick={toggleSidebar} className="md:hidden text-white">
          <X size={24} />
        </button>
      </div>
      <ul className="space-y-4">
        {links.map((link, index) => (
          <li key={index}>
            <a href={link.href} className="flex items-center text-white hover:bg-pink-600 p-3 rounded-md">
              {link.icon}
              <span className="ml-3">{link.text}</span>
            </a>
          </li>
        ))}
      </ul>
      <button className="w-full bg-pink-500 hover:bg-pink-600 text-white py-2 rounded-md">
        Logout
      </button>
    </div>
  );
}

export default function MentorDashboard() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleSidebar = () => setIsOpen(!isOpen);

  const mentorLinks = [
    { href: "/dashboard", text: "Dashboard", icon: <Home /> },
    { href: "/my-students", text: "My Students", icon: <User /> },
    { href: "/assigned-courses", text: "Assigned Courses", icon: <Book /> },
    { href: "/assignments", text: "Assignments", icon: <ClipboardList /> },
    { href: "/live-sessions", text: "Live Sessions", icon: <Video /> },
    { href: "/messages", text: "Messages", icon: <Mail /> },
  ];

  return (
    <div className="flex h-screen bg-white">
      {/* Sidebar */}
      <Sidebar links={mentorLinks} isOpen={isOpen} toggleSidebar={toggleSidebar} />
      
      {/* Main Content */}
      <div className="flex-1 p-6">
        {/* Toggler for small screens */}
        <button onClick={toggleSidebar} className="md:hidden text-black mb-4">
          <Menu size={28} />
        </button>

        <h1 className="text-3xl font-semibold mb-6 text-black">Welcome to Your Dashboard</h1>
        
        {/* Stats Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Students</h2>
            <p className="text-2xl font-bold text-pink-600">150</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Courses Assigned</h2>
            <p className="text-2xl font-bold text-pink-600">8</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Live Sessions</h2>
            <p className="text-2xl font-bold text-pink-600">3</p>
          </div>
        </div>
      </div>
    </div>
  );
}
