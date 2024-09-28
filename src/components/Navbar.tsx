"use client";

import { useAuth } from "@clerk/nextjs";
import Link from "next/link";
import { Montserrat } from "next/font/google";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

const font = Montserrat(
    {
        weight: "600", 
        subsets: ["latin"] 
    }
);
 
const Navbar = () => {
    const { isSignedIn} = useAuth();

    return(
        <>
            <nav className="p-4 bg-transparent flex items-center justify-between ">
                <Link href="/" className="flex items-center">
                    {/* <div className="relative h-8 w-8 mr-4">
                        Cooper Word
                    </div> */}
                    <h1 className={cn("text-2xl font-bold text-white", font.className)}>Cooper Word</h1>
                </Link>
                <div className="flex items-center gap-x-2">
                    <Link href={isSignedIn ? "/events" : "/sign-up"}>
                        <Button >
                            {isSignedIn ? "Dashboard" : "Sign Up"}
                        </Button>
                    </Link>
                </div>
            </nav>
        </>
    )

}

export default Navbar;