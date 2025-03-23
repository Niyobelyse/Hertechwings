import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <header className="p-4 bg-black text-white">
            <nav className="flex justify-between items-center">
            
                <div className="px-4">
                    <img src="images/mylogo.png" className="h-28 w-28" alt="Logo" />
                </div>

         
                <button 
                    className="lg:hidden text-white"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X size={30} /> : <Menu size={30} />}
                </button>

                {/* Navigation Links */}
                <ul className={`lg:flex lg:space-x-6 text-lg absolute lg:static bg-black lg:bg-transparent w-full lg:w-auto left-0 top-16 transition-all duration-300 ease-in-out ${isOpen ? "block" : "hidden"}`}>
                    <li className="py-2 lg:py-0 text-center lg:text-left">
                        <Link to="/" className="hover:text-pink-500">Home</Link>
                    </li>
                    <li className="py-2 lg:py-0 text-center lg:text-left">
                        <Link to="/about" className="hover:text-pink-500">About Us</Link>
                    </li>

                    <li className="py-2 lg:py-0 text-center lg:text-left">
                        <Link to="/contact" className="hover:text-pink-500">Contact Us</Link>
                    </li>
                    <li className="py-2 lg:py-0 text-center lg:text-left">
                        <Link to ="/login"><button className="bg-pink-500 px-4 py-2 rounded-lg">Login</button></Link>
                    </li>
                    <li className="py-2 lg:py-0 text-center lg:text-left">
                    <Link to ="/signup"><button className="border border-pink-500 px-4 py-2 rounded-lg text-pink-500 hover:bg-pink-500 hover:text-white">Sign Up</button></Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
}
