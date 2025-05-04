"use client"

import deleteUser from "@/functions/deleteUser";

export default function EmailDelete({formID}: { formID: string }) {
    return (
        <button onClick={async (e) => {
            await deleteUser(formID)
        }}>Delete</button>
    )
}