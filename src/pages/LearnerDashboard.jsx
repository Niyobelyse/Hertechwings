import React, { useState } from "react";
import { Book, ClipboardList, GraduationCap, Home, Mail, CheckCircle, Menu } from "lucide-react";

const Sidebar = ({ links, title, isOpen, toggleMenu }) => {
  return (
    <div
      className={`fixed top-0 left-0 h-full w-64 bg-black text-white p-6 flex flex-col justify-between transition-transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } sm:relative sm:translate-x-0`}
    >
      <button
        className="sm:hidden absolute top-4 left-4 text-white"
        onClick={toggleMenu}
      >
        ✖
      </button>
      <div>
        <h2 className="text-2xl font-semibold mb-8 text-pink-500">{title}</h2>
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
      </div>
      <div>
        <button className="w-full bg-pink-500 hover:bg-pink-600 text-white py-2 rounded-md">Logout</button>
      </div>
    </div>
  );
};

export default function LearnerDashboard() {
  const [menuOpen, setMenuOpen] = useState(false);
  
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  
  const learnerLinks = [
    { href: "/dashboard", text: "Dashboard", icon: <Home /> },
    { href: "/enrollments", text: "Enrollments", icon: <ClipboardList /> },
    { href: "/courses", text: "Courses", icon: <Book /> },
    { href: "/assignments", text: "Assignments", icon: <ClipboardList /> },
    { href: "/certificates", text: "Certificates", icon: <CheckCircle /> },
    { href: "/messages", text: "Messages", icon: <Mail /> },
  ];

  return (
    <div className="flex h-screen bg-white">
      {/* Menu Toggle Button for Small Screens */}
      <button className="sm:hidden fixed top-4 left-4 bg-pink-500 p-2 rounded" onClick={toggleMenu}>
        <Menu className="text-white" />
      </button>
      
      <Sidebar links={learnerLinks} title="Learner Dashboard" isOpen={menuOpen} toggleMenu={toggleMenu} />
      
      <div className="flex-1 p-6">
        <h1 className="text-3xl font-semibold mb-6 text-black">Welcome to Your Learner Dashboard</h1>

        {/* Stats Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-pink-100 p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4 text-black">Enrolled Courses</h2>
            <p className="text-2xl font-bold text-pink-600">5</p>
          </div>
          <div className="bg-pink-100 p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4 text-black">Pending Assignments</h2>
            <p className="text-2xl font-bold text-pink-600">3</p>
          </div>
          <div className="bg-pink-100 p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4 text-black">Certificates Earned</h2>
            <p className="text-2xl font-bold text-pink-600">2</p>
          </div>
        </div>

      </div>
    </div>
  );
}