"use client"

import {createUser} from "@/functions/createUser";
import {useState} from "react";

export default function UserFormComponent({formID}: { formID: string }) {
    const [error, setError] = useState("")

    return (
        <>
            <h1>Form access credentials</h1>
            <form action={async (e) => {
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

                const user = await createUser({email, password, formID})

                if (user.error) {
                    setError(user.error)
                    return
                } else {
                    setError("")
                }

            }}>
                <label>Email</label>
                <input className={"text-black"} type="email" name={"email"}/>

                <label>Password</label>
                <input className={"text-black"} type={"text"} name={"password"}/>

                {error ? <div>{error}</div> : null}

                <input type={"submit"}/>
            </form>
        </>
    )
}