
import { useState, useEffect } from "react";
import {getAds} from "@/functions/getAds";
import { getTokenFromDB } from "@/functions/getTokenFromDB";
import hero from "@/public/blackPosition.svg";

// import Link from "next/link";
import Image from "next/image";
import './admin.css';
import getAdAccounts from "@/functions/getAdAccounts";
// import { Search } from "lucide-react";
import ClientSideSearch from "@/component/ClientSideSearch";

export default async function Dashboard() {
    const accessToken = await getTokenFromDB();
    const accounts = await getAdAccounts(accessToken);
    
    const pages = await getAds(accessToken, "act_435796140303126") as {
        data: {
            access_token: string,
            name: string,
            id: string,
            category: string,
            category_list: any[],
            tasks: any[]
        }[]
    };
 
    return (
        <div className="dashboard-container">
            {/* Main Content */}
            <main className="content">
                <div className="dashboard-header">
                    <div className="font-bold text-2xl mb-6">
                    <Image src={hero} alt="Hero Background" className="hero-image" />
                    </div>                    
                    {/* Search Component */}
                    <ClientSideSearch pages={pages.data || []} />
                </div>
            </main>
        </div>
    );
}