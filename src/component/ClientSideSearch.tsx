"use client";
import Link from "next/link";
import { useState, ChangeEvent } from "react";
import { Search } from "lucide-react";
interface Page {
  access_token: string;
  name: string;
  id: string;
  category: string;
  category_list: any[];
  tasks: any[];
}

interface ClientSideSearchProps {
  pages: Page[];
}

export default function ClientSideSearch({ pages }: ClientSideSearchProps) {
   const [searchTerm, setSearchTerm] = useState<string>("");
const [filteredPages, setFilteredPages] = useState<Page[]>(pages);
    console.log(pages)
    const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchTerm(value);
        
        if (value.trim() === "") {
            setFilteredPages(pages);
        } else {
            const filtered = pages.filter(page => 
                page.name.toLowerCase().includes(value.toLowerCase())
            );
            setFilteredPages(filtered);
        }
    };

    return (
        <div className="page-container">
            <div className="search-container">
                <div className="search-input-wrapper">
                    <Search className="search-icon" size={20} />
                    <input
                        type="text"
                        placeholder="Search pages..."
                        value={searchTerm}
                        onChange={handleSearch}
                        className="search-input"
                    />
                </div>
            </div>

            
            <div className="page-list">
                <div className="page-list-header">
                    <span>Title</span>
                    <span>ID</span>
                </div>
                {
                    filteredPages && filteredPages.length > 0 ? (
                        filteredPages.map((page) => (
                            <div key={page.id} className="page-item">
                                <Link href={`/admin/dashboard/${page.id}`}>
                                    <span>{page.name}</span>
                                </Link>
                                <span>{page.id}</span>
                            </div>
                        ))
                    ) : (
                        <div className="page-item empty-state">
                            <span>{searchTerm ? "No pages match your search" : "No Pages associated to your account!"}</span>
                            <span>-</span>
                        </div>
                    )
                }
            </div>
        </div>
    );
}