'use client';

import { useState } from 'react';
import getAds from "@/functions/getAds";
import {getTokenFromDB} from "@/functions/getTokenFromDB";
import Link from "next/link";
import './admin.css';
// import getAdAccounts from "@/functions/getAdAccounts";

export default async function Dashboard() {
    const [searchTerm, setSearchTerm] = useState('');
    const accessToken = await getTokenFromDB();
    // Mocked data (in production, this would come from an API call)
    // const pages = {
    //     data: [
    //       {
    //         access_token: "EAAG...mockToken1",
    //         name: "Tech Gadget World",
    //         id: "101",
    //         category: "Shopping & Retail",
    //         category_list: [{ id: "1001", name: "Electronics" }],
    //         tasks: ["ADVERTISE", "ANALYZE"]
    //       },
    //       {
    //         access_token: "EAAG...mockToken2",
    //         name: "Fitness Pro Tips",
    //         id: "102",
    //         category: "Health/Beauty",
    //         category_list: [{ id: "1002", name: "Health" }],
    //         tasks: ["ADVERTISE", "MODERATE"]
    //       },
    //       {
    //         access_token: "EAAG...mockToken3",
    //         name: "Urban Streetwear Co.",
    //         id: "103",
    //         category: "Clothing (Brand)",
    //         category_list: [{ id: "1003", name: "Fashion" }],
    //         tasks: ["ADVERTISE", "MANAGE"]
    //       },
    //       {
    //         access_token: "EAAG...mockToken4",
    //         name: "Travel Dreams",
    //         id: "104",
    //         category: "Travel Company",
    //         category_list: [{ id: "1004", name: "Tourism" }],
    //         tasks: ["ADVERTISE", "CREATE_CONTENT"]
    //       },
    //       {
    //         access_token: "EAAG...mockToken5",
    //         name: "Pet Supplies Hub",
    //         id: "105",
    //         category: "Pet Supplies",
    //         category_list: [{ id: "1005", name: "Animals" }],
    //         tasks: ["ADVERTISE", "MODERATE", "ANALYZE"]
    //       },
    //       {
    //         access_token: "EAAG...mockToken6",
    //         name: "Local Eats & Treats",
    //         id: "106",
    //         category: "Restaurant",
    //         category_list: [{ id: "1006", name: "Food" }],
    //         tasks: ["ADVERTISE"]
    //       },
    //       {
    //         access_token: "EAAG...mockToken7",
    //         name: "Code With Me",
    //         id: "107",
    //         category: "Education Website",
    //         category_list: [{ id: "1007", name: "Learning" }],
    //         tasks: ["ADVERTISE", "INSIGHTS"]
    //       },
    //       {
    //         access_token: "EAAG...mockToken8",
    //         name: "Eco Green Products",
    //         id: "108",
    //         category: "Product/Service",
    //         category_list: [{ id: "1008", name: "Eco Friendly" }],
    //         tasks: ["ADVERTISE", "CREATE_CONTENT"]
    //       },
    //       {
    //         access_token: "EAAG...mockToken9",
    //         name: "Music Vibes",
    //         id: "109",
    //         category: "Music Band",
    //         category_list: [{ id: "1009", name: "Entertainment" }],
    //         tasks: ["ADVERTISE", "MODERATE"]
    //       },
    //       {
    //         access_token: "EAAG...mockToken10",
    //         name: "Startup Grind",
    //         id: "110",
    //         category: "Entrepreneur",
    //         category_list: [{ id: "1010", name: "Business" }],
    //         tasks: ["ADVERTISE", "INSIGHTS", "MODERATE"]
    //       }
    //     ]
    //   };
      
    
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


    // Filter pages based on search term
    const filteredPages = pages.data ? pages.data.filter(page => 
        page.name.toLowerCase().includes(searchTerm.toLowerCase())
    ) : [];


    return (
        <div className="dashboard-container p-6 bg-gradient-to-b from-gray-50 to-gray-100 min-h-screen">
            {/* Main Content */}
            <main className="content max-w-7xl mx-auto">
                <div className="mb-8">
                    <h1 className="font-bold text-center text-3xl text-gray-800 tracking-tight">Your Pages Dashboard</h1>
                    <p className="text-center text-gray-500 mt-2">Manage and monitor all your connected pages</p>
                </div>

                {/* Search Bar */}
                <div className="mb-8">
                    <div className="relative max-w-md mx-auto">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <svg className="w-5 h-5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                        <input
                            type="text"
                            className="block w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200"
                            placeholder="Search pages by name..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                {pages.data && pages.data.length > 0 ? (
                    <>
                        {/* Search Results Counter */}
                        {searchTerm && (
                            <div className="flex justify-between items-center mb-4 px-2 max-w-7xl mx-auto">
                                <div className="text-sm text-gray-600 font-medium">
                                    Found <span className="text-indigo-600">{filteredPages.length}</span> result{filteredPages.length !== 1 ? 's' : ''}
                                </div>
                                <button 
                                    className="text-sm text-indigo-500 hover:text-indigo-700 font-medium flex items-center transition duration-200"
                                    onClick={() => setSearchTerm('')}
                                >
                                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                    Clear search
                                </button>
                            </div>
                        )}

                        {/* Grid Display */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                            {filteredPages.map((page) => (
                                <Link key={page.id} href={`${process.env.HOST}/admin/dashboard/${page.id}`} className="block">
                                    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-5 hover:shadow-md transition-all duration-300 transform hover:-translate-y-1">
                                        <div className="flex justify-between items-center">
                                            <div>
                                                <h3 className="text-lg font-semibold text-gray-800 mb-1">{page.name}</h3>
                                                <div className="flex items-center">
                                                    <span className="inline-block bg-indigo-50 text-indigo-700 text-xs px-2 py-1 rounded-full font-medium">
                                                        {page.category}
                                                    </span>
                                                    {page.category_list && page.category_list[0] && (
                                                        <span className="inline-block bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full font-medium ml-2">
                                                            {page.category_list[0].name}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="bg-indigo-50 rounded-full p-2 text-indigo-600">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                                </svg>
                                            </div>
                                        </div>
                                        {page.tasks && page.tasks.length > 0 && (
                                            <div className="mt-3 pt-3 border-t border-gray-100">
                                                <div className="flex flex-wrap gap-1">
                                                    {page.tasks.map((task, index) => (
                                                        <span key={index} className="text-xs text-gray-500 px-2 py-1 bg-gray-50 rounded">
                                                            {task.toLowerCase().replace(/_/g, ' ')}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </Link>
                            ))}
                        </div>

                        {/* No Search Results Message */}
                        {searchTerm && filteredPages.length === 0 && (
                            <div className="mt-8 bg-white rounded-lg shadow-sm border border-gray-100 p-8 text-center max-w-2xl mx-auto">
                                <svg className="w-12 h-12 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <h3 className="text-xl font-medium text-gray-700 mb-1">No results found</h3>
                                <p className="text-gray-500">No pages match "<span className="font-medium">{searchTerm}</span>"</p>
                            </div>
                        )}
                    </>
                ) : (
                    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-8 text-center max-w-2xl mx-auto">
                        <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                        <h3 className="text-xl font-medium text-gray-700 mb-2">No Pages Found</h3>
                        <p className="text-gray-500 mb-4">There are currently no pages associated with your account.</p>
                        
                    </div>
                )}
            </main>
        </div>
    );
}