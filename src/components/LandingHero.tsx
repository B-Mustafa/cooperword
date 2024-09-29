"use client";
import { useAuth } from "@clerk/nextjs";
import Link from "next/link";
import TypeWriterComponent from 'typewriter-effect'
import { Button } from "./ui/button";

const LandingHero = () => {
    const { isSignedIn } = useAuth();
    return (
        <div className="text-white font-bold py-36 text-center space-y-5">
            <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl space-y-5 font-extrabold">
                <h1>
                    The Best AI Tool For
                </h1>
                <div className="text-transparent bg-clip-text pb-2 bg-gradient-to-r from-purple-400 via-indigo-500 to-pink-600">
                    <TypeWriterComponent
                        options={{
                            strings: ['Event Mangement', 'Task Management',],
                            autoStart: true,
                            loop: true,
                        }}
                    />
                </div>
            </div>
            <div className="text-sm md:text-xl font-light text-zinc-400">
                Manage Your Events and Tasks with Ease and Efficiency with our Chatbot
            </div>
            <div>
                <Link href={isSignedIn ? "/events" : "/sign-up"}>
                    <Button className="md:text-lg p-4 md:p-6 font-semibold">
                        {isSignedIn ? "Dashboard" : "Get Started"}
                    </Button>
                </Link>
            </div>
            <div className="text-muted-foreground text-xs md:text-sm font-normal">
                No credit card required
            </div>
        </div>
    );
};

export default LandingHero;