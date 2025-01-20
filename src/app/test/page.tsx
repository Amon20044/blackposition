"use client";
import React from "react";
import { GrMailOption, GrPhone } from "react-icons/gr"; // Import icons
import "./card.css";

type LeadDetails = {
    name: string;
    phoneNumber: string;
    email: string;
};

const leadDetails: LeadDetails = {
    name: "Chahat Rawat",
    phoneNumber: "+91 7489505964",
    email: "chahatrawat04@gmail.com",
};

function Page() {
    return <Card details={leadDetails} />;
}

const Card: React.FC<{ details: LeadDetails }> = ({ details }) => {
    return (
        <div className="card-container">
            <div className="card-details">
                <div className="card-row">
                    <span className="card-label">Name</span>
                    <span className="card-value">{details.name}</span>
                </div>
                <div className="card-row">
                    <span className="card-label">Phone Number</span>
                    <span className="card-value">{details.phoneNumber}</span>
                </div>
                <div className="card-row">
                    <span className="card-label">Email</span>
                    <span className="card-value">
                        <a href={`mailto:${details.email}`} className="card-link">
                            {details.email}
                        </a>
                    </span>
                </div>
            </div>
            <div className="card-actions">
                <button
                    className="card-button"
                    onClick={() => window.open(`mailto:${details.email}`)}
                >
                    <div className="flex flex-row gap-3 items-center"> <GrMailOption /> Mail </div><div><svg xmlns="http://www.w3.org/2000/svg" width="22" height="15" viewBox="0 0 22 15" fill="none">
                        <path d="M21.531 8.24649C21.9218 7.85565 21.9218 7.22199 21.531 6.83115L15.162 0.46216C14.7712 0.0713275 14.1375 0.0713274 13.7467 0.46216C13.3558 0.852994 13.3558 1.48666 13.7467 1.87749L19.408 7.53882L13.7467 13.2001C13.3558 13.591 13.3558 14.2246 13.7467 14.6155C14.1375 15.0063 14.7712 15.0063 15.162 14.6155L21.531 8.24649ZM0.799683 8.53961L20.8233 8.53961L20.8233 6.53803L0.799683 6.53803L0.799683 8.53961Z" fill="white" />
                    </svg></div>
                </button>
                <button
                    className="card-button"
                    onClick={() => window.open(`tel:${details.phoneNumber}`)}
                >
                    <div className="flex flex-row gap-3 items-center"> <GrPhone /> Call </div><div ><svg xmlns="http://www.w3.org/2000/svg" width="22" height="15" viewBox="0 0 22 15" fill="none">
                        <path d="M21.531 8.24649C21.9218 7.85565 21.9218 7.22199 21.531 6.83115L15.162 0.46216C14.7712 0.0713275 14.1375 0.0713274 13.7467 0.46216C13.3558 0.852994 13.3558 1.48666 13.7467 1.87749L19.408 7.53882L13.7467 13.2001C13.3558 13.591 13.3558 14.2246 13.7467 14.6155C14.1375 15.0063 14.7712 15.0063 15.162 14.6155L21.531 8.24649ZM0.799683 8.53961L20.8233 8.53961L20.8233 6.53803L0.799683 6.53803L0.799683 8.53961Z" fill="white" />
                    </svg></div>
                </button>
            </div>
        </div>
    );
};

export default Page;
