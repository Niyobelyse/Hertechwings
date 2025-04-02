import React, { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { Book, ClipboardList, GraduationCap, Home, Mail, CheckCircle, Menu } from "lucide-react";
import CourseListSection from "../components/CourseList";
import AssignmentTracker from "../components/Assignment";
import MyCourses from "../components/Certificate";
import MessageApp from "../components/Message";


const Sidebar = ({ links, title, isOpen, toggleMenu }) => {
  const navigate = useNavigate(); // Hook for programmatic navigation

  const handleLogout = () => {
    // Perform logout actions here (e.g., clearing auth tokens, calling API)
    navigate("/"); // Redirect to home page
  };

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
              <Link
                to={link.href}
                className="flex items-center text-white hover:bg-pink-600 p-3 rounded-md"
              >
                {link.icon}
                <span className="ml-3">{link.text}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <button onClick={handleLogout} className="w-full bg-pink-500 hover:bg-pink-600 text-white py-2 rounded-md">Logout</button>
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
    { href: "/learnerdashboard", text: "Dashboard", icon: <Home /> },
    // { href: "/learnerdashboard/courses", text: "Courses", icon: <Book /> }, // Link to /courses
    { href: "/learnerdashboard/assignments", text: "Assignments", icon: <ClipboardList /> },
    { href: "/learnerdashboard/learnerresources", text: "Resources", icon: <CheckCircle /> },

  
  ];

  return (
    <div className="flex h-screen bg-white">
     
      <button className="sm:hidden fixed top-4 left-4 bg-pink-500 p-2 rounded" onClick={toggleMenu}>
        <Menu className="text-white" />
      </button>
      
      <Sidebar links={learnerLinks} title="" isOpen={menuOpen} toggleMenu={toggleMenu} />
      
      <div className="flex-1 p-6">
      

        {/* Stats Section */}


        
        <Outlet /> 
        
      </div>
    </div>
  );
}
