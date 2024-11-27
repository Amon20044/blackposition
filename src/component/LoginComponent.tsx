"use client"

import loginUser from "@/functions/loginUser";
import {useState} from "react";
import {useRouter} from "next/navigation";
import { FiUser, FiEye } from "react-icons/fi"; // Importing icons from react-icons

import "./login.css"

export default function LoginComponent() {
    const [error, setError] = useState("")
    const [showPassword, setShowPassword] = useState(false); // State for password visibility
    
    const router = useRouter()
    return (
        <form className="form" action={async (e) => {
            const email = e.get("email")?.valueOf()
            const password = e.get("password")?.valueOf()

            if (!email || !password) {
                setError("Email and password are required")
                return
            }

            if (typeof email != "string" || typeof password != "string") {
                setError("Email and password are required")
                return
            }

            const user = await loginUser({email, password})

            if (user.error) {
                setError(user.error)
                return
            } else {
                router.push("/customer/dashboard")
                setError("")
            }
        }}>
            <div className="inputBox">
                    <div className="box">
                        <label>ID</label>
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
                                placeholder="..........." 
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
                </div>
        </form>
    )
}