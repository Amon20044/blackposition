// components/LogoDisplay.js
"use client"
import Image from "next/image";
import logo from "@/public/BlackPosition.svg";
import "./login.css"

export default function LogoDisplay() {
    return (
        <div className="flex logo p-4 w-[50vw] bg-black max-[750px]:w-[100vw] max-[750px]:h-[4vh]">
            <Image
                src={logo}
                alt="Black Position"
                width={typeof window !== "undefined" ? window.innerWidth <= 750 ? 48 : 200 : 200}
            />
        </div>
    );
}
