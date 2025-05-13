"use client";

import loginUser from "@/functions/loginUser";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FiUser, FiEye } from "react-icons/fi";
import "./login.css";

export default function LoginComponent() {
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true); // Show loader when login starts

        const form = e.currentTarget;
        const email = form.email.value;
        const password = form.password.value;

        if (!email || !password) {
            setError("Email and password are required");
            setIsLoading(false);
            return;
        }

        if (typeof email !== "string" || typeof password !== "string") {
            setError("Email and password are required");
            setIsLoading(false);
            return;
        }

        try {
            const user = await loginUser({ email, password });

            if (user.error) {
                setError(user.error);
                setIsLoading(false);
            } else {
                router.push("/customer/dashboard");
                setError("");
                // We don't need to hide the loader here as we're navigating away
            }
        } catch (err) {
            setError("An unexpected error occurred");
            setIsLoading(false);
        }
    };

    return (
        <div className="relative">
            {isLoading && (
                <div className="google-orbital-loader">
                    <div className="loader-container">
                        <div className="orbital-ring ring-1"></div>
                        <div className="orbital-ring ring-2"></div>
                        <div className="orbital-ring ring-3"></div>
                        <div className="google-dot dot-red"></div>
                        <div className="google-dot dot-blue"></div>
                        <div className="google-dot dot-yellow"></div>
                        <div className="google-dot dot-green"></div>
                        <div className="center-element"></div>
                        <div className="loader-text">
                            Loading<span className="loading-dots"><span>.</span><span>.</span><span>.</span></span>
                        </div>
                    </div>
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