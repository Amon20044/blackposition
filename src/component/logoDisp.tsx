"use client";
import Image from "next/image";
import logo from "@/public/blackPosition.svg";
import "./login.css";

export default function LogoDisplay() {
    const scale = typeof window !== "undefined" && window.innerWidth <= 1100 ? 1 : 2;

    return (
        <div className="flex logo p-4 w-[50vw] max-[750px]:w-[100vw] max-[750px]:h-[4vh]">
            <Image
                src={logo}
                alt="Black Position"
                sizes="50vw"
                style={{ objectFit: "cover", transform: `scale(${scale})` }}
            />
        </div>
    );
}
