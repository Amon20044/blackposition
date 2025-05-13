"use client";

import { useState } from "react";
import { createUser } from "@/functions/createUser";
import deleteUser from "@/functions/deleteUser";
import './addMember.css';

interface ClientData {
  email: string;
  formID: string;
}

interface UserFormComponentProps {
  formID: string;
  clientData?: ClientData | null;
}

export default function UserFormComponent({ formID, clientData }: UserFormComponentProps) {
  const [email, setEmail] = useState<string>(clientData?.email || "");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");

  const handleMail = () => {
    if (clientData?.email) {
      window.location.href = `mailto:${clientData.email}`;
    }
  };

  const handleDelete = async () => {
    if (!clientData) return;
    try {
      await deleteUser(clientData.formID);
      alert("User deleted successfully.");
      window.location.reload(); // Refresh to reflect changes
    } catch (err) {
      console.error(err);
      alert("Failed to delete user.");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!email || !password) {
      setError("Email and password are required");
      return;
    }

    try {
      const result = await createUser({ email, password, formID });
      if (result.error) {
        setError(result.error);
      } else {
        setSuccess("User access created successfully!");
        setEmail("");
        setPassword("");
        window.location.reload(); // Refresh to show the new clientData
      }
    } catch {
      setError("Unexpected error. Please try again.");
    }
  };

  return (
    <div className="add-member-form">
      {clientData ? (
        <>
          <h1 className="add-member-title">Client Info</h1>
          <div className="add-member-field-display">
            <div className="add-member-field-name">Email</div>
            <div className="add-member-field-value">{clientData.email}</div>
          </div>

          <div className="add-member-action-container">
            <button className="add-member-action-button" onClick={handleMail}>
              Mail
            </button>
            <button className="add-member-action-button-delete" onClick={handleDelete}>
              Delete
            </button>
          </div>
        </>
      ) : (
        <>
          <h1 className="add-member-title">Create Access</h1>
          <form onSubmit={handleSubmit}>
            <div className="add-member-field">
              <label className="add-member-label">Email</label>
              <input
                className="add-member-input text-black"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="add-member-field">
              <label className="add-member-label">Password</label>
              <input
                className="add-member-input text-black"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {error && <div className="add-member-error">{error}</div>}
            {success && <div className="add-member-success">{success}</div>}

            <button className="add-member-button" type="submit">
              Submit
            </button>
          </form>
        </>
      )}
    </div>
  );
}
