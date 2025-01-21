"use client";

import loginUser from "@/functions/loginUser";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FiUser, FiEye } from "react-icons/fi";
import "./login.css";

export default function LoginComponent() {
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false); // State for password visibility
    const [isLoading, setIsLoading] = useState(false); // State for loader visibility

    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // Prevent default form submission
        setIsLoading(true); // Show loader when login starts

        const form = e.currentTarget; // Access the form
        const email = form.email.value;
        const password = form.password.value;

        if (!email || !password) {
            setError("Email and password are required");
            setIsLoading(false); // Hide loader on error
            return;
        }

        if (typeof email !== "string" || typeof password !== "string") {
            setError("Email and password are required");
            setIsLoading(false); // Hide loader on error
            return;
        }

        const user = await loginUser({ email, password });

        if (user.error) {
            setError(user.error);
            setIsLoading(false); // Hide loader on error
        } else {
            router.push("/customer/dashboard");
            setError("");
        }
    };

    return (
        <div className="relative">
            {isLoading && (
                <div className="loader-overlay">
                    <div className="loader"></div>
                </div>
            )}

            <form className="form" onSubmit={handleSubmit}>
                <div className="">
                    <div className="text">Find Your Audience</div>
                    <div className="text-down">The Next Step for Success</div>
                </div>
                <div className="inputBox w-full">
                    <div className="box">
                        <label>Email ID</label>
                        <div className="input-icon-wrapper">
                            <input
                                className="input-field"
                                type="text"
                                name="email"
                                placeholder="HeyGandhinagar"
                            />
                            <FiUser className="icon" />
                        </div>
                    </div>
                    <div className="box">
                        <label>Password</label>
                        <div className="input-icon-wrapper">
                            <input
                                className="input-field"
                                type={showPassword ? "text" : "password"}
                                name="password"
                                placeholder="**********"
                            />
                            <FiEye
                                className="icon"
                                onClick={() => setShowPassword(!showPassword)}
                            />
                        </div>
                    </div>
                    <button className="login-button" type="submit">
                        Login
                    </button>
                    {error && <p className="error-message">{error}</p>}
                    <hr className="my-12 h-0.5 border-t-0 bg-slate-400 dark:bg-white/10" />
                </div>
            </form>
        </div>
    );
}
