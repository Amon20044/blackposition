"use client"

import { createUser } from "@/functions/createUser";
import { useState } from "react";

export default function UserFormComponent({ formID }: { formID: string }) {
    const [error, setError] = useState<string>(""); // Ensure error is typed correctly
    const [email, setEmail] = useState<string>(""); // Track email input
    const [password, setPassword] = useState<string>(""); // Track password input
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false); // Track form submission state

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault(); // Prevent the default form submission

        // Validate email and password
        if (!email || !password) {
            setError("Email and password are required");
            return;
        }

        if (typeof email !== "string" || typeof password !== "string") {
            setError("Email and password must be strings");
            return;
        }

        setIsSubmitting(true); // Start submitting

        try {
            const user = await createUser({ email, password, formID });

            if (user.error) {
                setError(user.error); // Display error if any
            } else {
                setError(""); // Clear any previous error
            }
        } catch (err) {
            setError("An unexpected error occurred. Please try again.");
        } finally {
            setIsSubmitting(false); // Reset submitting state
        }
    };

    return (
        <>
            <h1>Form Access Credentials</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email</label>
                    <input
                        className="text-black"
                        type="email"
                        name="email"
                        value={email} // Bind the email state
                        onChange={(e) => setEmail(e.target.value)} // Update email state on change
                        required
                    />
                </div>

                <div>
                    <label>Password</label>
                    <input
                        className="text-black"
                        type="password"
                        name="password"
                        value={password} // Bind the password state
                        onChange={(e) => setPassword(e.target.value)} // Update password state on change
                        required
                    />
                </div>

                {/* Display error if there is any */}
                {error && <div className="error-message">{error}</div>}

                {/* Submit button */}
                <button type="submit" disabled={isSubmitting}> {/* Disable button while submitting */}
                    {isSubmitting ? "Submitting..." : "Submit"}
                </button>
            </form>
        </>
    );
}
