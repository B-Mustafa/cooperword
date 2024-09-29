"use client";

import { useAuth, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { Montserrat } from "next/font/google";
import { cn } from "@/lib/utils";
// import { Button } from "./ui/button";
import { Calendar, MessageCircle, Menu, X } from "lucide-react"; // Import Menu and X icons
import { useState } from "react";

const font = Montserrat({
    weight: "600",
    subsets: ["latin"]
});

const DashboardNavbar = () => {
    const { isSignedIn } = useAuth();
    const [menuOpen, setMenuOpen] = useState(false); // State to control the menu visibility

    const toggleMenu = () => {
        setMenuOpen(!menuOpen); // Toggle the menu open state
    };

    return (
        <nav className="p-4 bg-transparent flex items-center justify-between relative">
            <Link href="/" className="flex items-center">
                <h1 className={cn("text-2xl font-bold text-white", font.className)}>Cooper Word</h1>
            </Link>
            <div className="hidden md:flex items-center gap-x-4">
                <Link href="/chat" className="flex items-center">
                    <MessageCircle className="w-6 h-6 mr-2" />
                    Chatbot
                </Link>
                <Link href="/events" className="flex items-center">
                    <Calendar className="w-6 h-6 mr-2" />
                    Events
                </Link>
                <Link href={isSignedIn ? "/events" : "/sign-up"} className="flex items-center w-8 h-8">
                    {isSignedIn ? <UserButton /> : "Sign Up"}
                </Link>
            </div>
            <div className="md:hidden">
                <button onClick={toggleMenu} className="text-white focus:outline-none">
                    {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
            </div>

            {/* Mobile Menu */}
            {menuOpen && (
                <div className="absolute top-14 right-0 bg-zinc-900 transition-all ease-in-out rounded-md shadow-lg w-48 z-10">
                    <div className="flex flex-col p-4">
                        <Link href="/chat" className="flex items-center mb-2">
                            <MessageCircle className="w-6 h-6 mr-2 text-white" />
                            Chatbot
                        </Link>
                        <Link href="/events" className="flex items-center mb-2">
                            <Calendar className="w-6 h-6 mr-2 text-white" />
                            Events
                        </Link>
                        <Link href={isSignedIn ? "/events" : "/sign-up"} className="flex items-center">
                            {isSignedIn ? <UserButton /> : "Sign Up"}
                        </Link>
                    </div>
                </div>
            )}
        </nav>
    );
}

export default DashboardNavbar;
