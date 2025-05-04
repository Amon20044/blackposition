"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import UserFormComponent from "@/component/UserFormComponent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import "@/app/customer/dashboard/cust.css";
import hero from "@/public/heroLead.png";
import Image from "next/image";
import "./card.css";
import logo from "@/public/blackPosition.svg";
import { GrMailOption, GrPhone } from "react-icons/gr";

export default function LeadDisplayComponent({
    leads,
    formID,
    adname,
    admin,
}: {
    leads: { data: any[] } | undefined;
    formID: string;
    adname: string;
    admin?: boolean;
}) {
    const [showModal, setShowModal] = useState(false);
    const router = useRouter();

    const handleOpenModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    return (
        <div className="dashboard-container bg-black">
            {/* Hero Section */}
            <div className="hero-section">
                <Image src={hero} alt="Hero Background" className="hero-image" />
                <div className="logo-wrapper">
                    <Image src={logo} alt="Logo" className="logo-image" />
                </div>
            </div>

            {/* Content Section */}
            <div className="content-section">
                {/* Back Button */}
                <div className="ty">
                    <button onClick={() => router.back()} className="backBut">
                        <svg xmlns="http://www.w3.org/2000/svg" width="51" height="51" viewBox="0 0 51 51" fill="none">
                            <rect x="0.0192871" y="0.391602" width="50.0812" height="50.0812" rx="25.0406" fill="#1D1E1E" />
                            <rect x="3.35596" y="0.391602" width="43.408" height="43.408" rx="21.704" fill="white" />
                            <path
                                d="M11.786 21.342C11.3698 21.7583 11.3698 22.4331 11.786 22.8494L18.569 29.6323C18.9852 30.0485 19.66 30.0485 20.0763 29.6323C20.4925 29.2161 20.4925 28.5412 20.0763 28.125L14.047 22.0957L20.0763 16.0664C20.4925 15.6502 20.4925 14.9753 20.0763 14.5591C19.66 14.1429 18.9852 14.1429 18.569 14.5591L11.786 21.342ZM37.58 21.0299L12.5397 21.0299V23.1615L37.58 23.1615V21.0299Z"
                                fill="#1D1E1E"
                            />
                        </svg>
                    </button>

                    <h1 className="section-title">{adname}</h1>

                    {/* Add Team Member Button */}
                    {admin && (
                        <button onClick={handleOpenModal} className="add-team-button">
                            <FontAwesomeIcon icon={faUserPlus} className="icon-left ic" />
                            Add Team Member
                        </button>
                    )}

                    {/* Modal Dialog */}
                    {showModal && (
                        <div className="modal-backdrop">
                            <div className="modal-content">
                                <button onClick={handleCloseModal} className="close-button">
                                    X
                                </button>
                                <UserFormComponent formID={formID} />
                            </div>
                        </div>
                    )}

                    {/* Leads Grid */}
                    <div className="ads-grid cont">
                        {leads && leads.data && leads.data.length > 0 ? (
                            leads.data.map((lead) => (
                                <div className="card-container" key={lead.id}>
                                    <div className="card-details">
                                        {lead.field_data.map((field: { name: string; values: string[] }) => (
                                            <div className="card-row" key={field.name}>
                                                <span className="card-label">{field.name}</span>
                                                <span className="card-value">{field.values}</span>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="card-actions">
                                        <button
                                            className="card-button"
                                            onClick={() =>
                                                window.open(`mailto:${lead.field_data.find((field: { name: string; }) => field.name.toLowerCase() === "email")?.values[0]}`)
                                            }
                                        >
                                            <div className="flex flex-row gap-3 items-center">
                                                <GrMailOption /> Mail
                                            </div>
                                            <div ><svg xmlns="http://www.w3.org/2000/svg" width="22" height="15" viewBox="0 0 22 15" fill="none">
                                                <path d="M21.531 8.24649C21.9218 7.85565 21.9218 7.22199 21.531 6.83115L15.162 0.46216C14.7712 0.0713275 14.1375 0.0713274 13.7467 0.46216C13.3558 0.852994 13.3558 1.48666 13.7467 1.87749L19.408 7.53882L13.7467 13.2001C13.3558 13.591 13.3558 14.2246 13.7467 14.6155C14.1375 15.0063 14.7712 15.0063 15.162 14.6155L21.531 8.24649ZM0.799683 8.53961L20.8233 8.53961L20.8233 6.53803L0.799683 6.53803L0.799683 8.53961Z" fill="white" />
                                            </svg></div>
                                        </button>
                                        <button
                                            className="card-button"
                                            onClick={() =>
                                                window.open(`tel:${lead.field_data.find((f: { name: string; }) => f.name === "phone_number")?.values[0]}`)
                                            }
                                        >
                                            <div className="flex flex-row gap-3 items-center">
                                                <GrPhone /> Call
                                            </div>
                                            <div ><svg xmlns="http://www.w3.org/2000/svg" width="22" height="15" viewBox="0 0 22 15" fill="none">
                                                <path d="M21.531 8.24649C21.9218 7.85565 21.9218 7.22199 21.531 6.83115L15.162 0.46216C14.7712 0.0713275 14.1375 0.0713274 13.7467 0.46216C13.3558 0.852994 13.3558 1.48666 13.7467 1.87749L19.408 7.53882L13.7467 13.2001C13.3558 13.591 13.3558 14.2246 13.7467 14.6155C14.1375 15.0063 14.7712 15.0063 15.162 14.6155L21.531 8.24649ZM0.799683 8.53961L20.8233 8.53961L20.8233 6.53803L0.799683 6.53803L0.799683 8.53961Z" fill="white" />
                                            </svg></div>
                                        </button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div>No leads available</div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
