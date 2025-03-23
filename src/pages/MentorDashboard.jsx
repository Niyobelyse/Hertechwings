import React from "react";
import { Book, ClipboardList, Home, Mail, User, Video } from "lucide-react";

function Sidebar({ links, title }) {
  return (
    <div className="w-64 bg-black text-white p-6 flex flex-col justify-between">
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
        <button className="w-full bg-pink-500 hover:bg-pink-600 text-white py-2 rounded-md">
          Logout
        </button>
      </div>
    </div>
  );
}

export default function MentorDashboard() {
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
      <Sidebar links={mentorLinks} title="Mentor Dashboard" />
      <div className="flex-1 p-6">
        <h1 className="text-3xl font-semibold mb-6 text-black">Welcome to Your Dashboard</h1>
        {/* Mentor content here */}
      </div>
    </div>
  );
}
