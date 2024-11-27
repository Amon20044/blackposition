"use client";
import React from 'react';
import Link from 'next/link';
import logo from "@/public/BlackPosition.svg";
import Image from 'next/image';
import { usePathname } from "next/navigation";

function Navbar() {
    const pathname = usePathname();

    if (pathname === "/" || pathname === "/main") {
        return null;
    }

    return (
        <div className="dashboard-container">
            {/* Sidebar */}
            <aside className="sidebar">
                <div className="logo">
                    <Image
                        src={logo}
                        alt="Black Position"
                        width={48}
                    />
                </div>
                <nav>
                    <ul className="">
                        <li className="link"><Link href="/clients">Clients</Link></li>
                        <li className="link"><Link href="/admin/dashboard">Content</Link></li>
                        <li className="link"><Link href="/team">Team</Link></li>
                    </ul>
                </nav>
                <button className="logout-button"><Link href="/">Logout</Link></button>
            </aside>
        </div>
    );
}

export default Navbar;
