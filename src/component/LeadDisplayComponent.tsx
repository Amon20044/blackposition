"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import UserFormComponent from "@/component/UserFormComponent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { GrMailOption, GrPhone } from "react-icons/gr";
import Image from "next/image";
import hero from "@/public/heroLead.png";
import logo from "@/public/blackPosition.svg";
import "./card.css";
import "@/app/customer/dashboard/cust.css";
import { clientData } from "@/app/admin/dashboard/[pageID]/page";
export default function LeadDisplayComponent({
    leads,
    formID,
    adname,
    admin,
    clientData
}: {
    leads: { data: any[] } | undefined;
    formID: string;
    adname: string;
    admin?: boolean;
    clientData?: clientData;
}) {
    const [showModal, setShowModal] = useState(false);
    const handleOpenModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    // Prevent scroll when modal is open
    useEffect(() => {
        if (showModal) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
    }, [showModal]);

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
                <div className="ty header-actions">
                    <button onClick={() => {
                        window.location.href =  '/admin/dashboard';
                    }} className="backBut" aria-label="Go back">
                        <svg xmlns="http://www.w3.org/2000/svg" width="51" height="51" viewBox="0 0 51 51" fill="none">
                            <rect x="0.019" y="0.391" width="50.081" height="50.081" rx="25.04" fill="#1D1E1E" />
                            <rect x="3.356" y="0.391" width="43.408" height="43.408" rx="21.704" fill="white" />
                            <path
                                d="M11.786 21.342C11.37 21.758 11.37 22.433 11.786 22.849L18.569 29.632C18.985 30.049 19.66 30.049 20.076 29.632C20.493 29.216 20.493 28.541 20.076 28.125L14.047 22.096L20.076 16.066C20.493 15.65 20.493 14.975 20.076 14.559C19.66 14.143 18.985 14.143 18.569 14.559L11.786 21.342ZM37.58 21.03H12.54V23.162H37.58V21.03Z"
                                fill="#1D1E1E"
                            />
                        </svg>
                    </button>

                    <h1 className="section-title">{adname}</h1>

                    {admin && (
                        <button onClick={handleOpenModal} className="add-team-button absolute right-0" aria-label="Add Team Member">
                            <FontAwesomeIcon icon={faUserPlus}  />
                        </button>
                    )}
                </div>

                {/* Modal */}
                {showModal && (
                    <div className="modal-backdrop" role="dialog" aria-modal="true">
                        <div className="modal-content">
                            <button onClick={handleCloseModal} className="close-button" aria-label="Close Modal">X</button>
                            <UserFormComponent formID={formID} clientData={clientData}/>
                        </div>
                    </div>
                )}

                {/* Leads Grid */}
                <div className="ads-grid cont">
                    {leads?.data?.length ? (
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
                                            window.open(`mailto:${lead.field_data.find((f: { name: string }) => f.name.toLowerCase() === "email")?.values[0]}`)
                                        }
                                    >
                                        <div className="flex flex-row gap-3 items-center">
                                            <GrMailOption /> Mail
                                        </div>
                                        <div>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="15" viewBox="0 0 22 15" fill="none">
                                                <path d="M21.531 8.246C21.922 7.856 21.922 7.222 21.531 6.831L15.162 0.462C14.771 0.071 14.138 0.071 13.747 0.462C13.356 0.853 13.356 1.487 13.747 1.877L19.408 7.539L13.747 13.2C13.356 13.591 13.356 14.225 13.747 14.615C14.138 15.006 14.771 15.006 15.162 14.615L21.531 8.246ZM0.8 8.54H20.823V6.538H0.8V8.54Z" fill="white" />
                                            </svg>
                                        </div>
                                    </button>

                                    <button
                                        className="card-button"
                                        onClick={() =>
                                            window.open(`tel:${lead.field_data.find((f: { name: string }) => f.name === "phone_number")?.values[0]}`)
                                        }
                                    >
                                        <div className="flex flex-row gap-3 items-center">
                                            <GrPhone /> Call
                                        </div>
                                        <div>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="15" viewBox="0 0 22 15" fill="none">
                                                <path d="M21.531 8.246C21.922 7.856 21.922 7.222 21.531 6.831L15.162 0.462C14.771 0.071 14.138 0.071 13.747 0.462C13.356 0.853 13.356 1.487 13.747 1.877L19.408 7.539L13.747 13.2C13.356 13.591 13.356 14.225 13.747 14.615C14.138 15.006 14.771 15.006 15.162 14.615L21.531 8.246ZM0.8 8.54H20.823V6.538H0.8V8.54Z" fill="white" />
                                            </svg>
                                        </div>
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-bl">No leads available</div>
                    )}
                </div>
            </div>
        </div>
    );
}
