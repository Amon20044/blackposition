"use client"
import { useState } from "react";
import UserFormComponent from "@/component/UserFormComponent";
import "./Lead.css"
import Link from "next/link";

export default function LeadDisplayComponent({
    leads,
    formID,
    admin
}: {
    leads: { data: any[] };
    formID: string;
    admin?: boolean;
}) {
    const [showModal, setShowModal] = useState(false);

    const handleOpenModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    return (
        <div className="lead-display-container">
            {/* Sidenavbar */}
            <div>
                <h1 className="font-bold text-xl">
                <Link className='font-bold text-xl' href={'/admin/dashboard'}>Pages {' –'}</Link><Link href={'/admin/dashboard'} className='font-bold text-xl'> {`>`} Forms {' –'}</Link>{`>`} Form ID:{formID}
                </h1>
                                
                {/* Add + Team Member button to open the modal */}
                {admin && (
                    <button onClick={handleOpenModal} className="add-team-button">
                        Add Team Member
                    </button>
                )}

                {/* Modal dialog */}
                {showModal && (
                    <div className="modal-backdrop">
                        <div className="modal-content">
                            <button onClick={handleCloseModal} className="close-button">X</button>
                            <UserFormComponent formID={formID} />
                        </div>
                    </div>
                )}

                <h1 className="leads-header">Leads:</h1>
                <div className="leads-list">
                    {leads.data.map((lead: { created_time: string; id: string; field_data: { name: string; values: string[] }[] }) => (
                        <div key={lead.id} className="lead-item">
                            <p className="lead-id">Lead ID: {lead.id}</p>
                            <div className="lead-fields">
                                {lead.field_data.map((field: { name: string; values: string[] }) => (
                                    <div key={field.name} className="field-item">
                                        <p className="field-name">{field.name}:</p>
                                        <p className="field-values">{field.values.join(", ")}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
