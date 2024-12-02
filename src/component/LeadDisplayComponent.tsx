"use client"
import { useState } from "react";
import UserFormComponent from "@/component/UserFormComponent";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus, faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';
import Link from "next/link";
import './lead.css'

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
                    <Link className='font-bold text-xl underline' href={'/admin/dashboard'}>Pages {' >'}</Link><Link href={'/admin/dashboard'} className='font-bold text-xl underline'> Forms {' >'}</Link> Form ID:{formID}
                </h1>

                {/* Add + Team Member button to open the modal */}
                {admin && (
                    <button onClick={handleOpenModal} className="add-team-button">
                        <FontAwesomeIcon icon={faUserPlus} className="icon-left ic" />
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
                            <p className="lead-id">
                                <strong>Lead ID:</strong> {lead.id}
                            </p>
                            <div className="lead-fields-container">
                                <div className="lead-fields">
                                    {lead.field_data.map((field: { name: string; values: string[] }) => (
                                        <div key={field.name} className="field-item">
                                            <p className="field-name">{field.name}:</p>
                                            {field.name.toLowerCase() === 'email' ? (
                                                <a href={`mailto:${field.values[0]}`} className="field-values">
                                                    {field.values[0]}
                                                </a>
                                            ) : field.name.toLowerCase() === 'phone' ? (
                                                <a href={`tel:${field.values[0]}`} className="field-values">
                                                    {field.values[0]}
                                                </a>
                                            ) : (
                                                <p className="field-values">{field.values.join(", ")}</p>
                                            )}
                                        </div>
                                    ))}
                                </div>
                                <div className="lead-icons">
                                    {lead.field_data.some(field => field.name.toLowerCase() === 'email') && (
                                        <a
                                            href={`mailto:${lead.field_data.find(field => field.name.toLowerCase() === 'email')?.values[0]
                                                }`}
                                            className="icon"
                                        >
                                            <FontAwesomeIcon icon={faEnvelope} />
                                        </a>
                                    )}
                                    {lead.field_data.some(field => field.name.toLowerCase() === 'phone') && (
                                        <a
                                            href={`tel:${lead.field_data.find(field => field.name.toLowerCase() === 'phone')?.values[0]
                                                }`}
                                            className="icon"
                                        >
                                            <FontAwesomeIcon icon={faPhone} />
                                        </a>
                                    )}

                                </div>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
}
