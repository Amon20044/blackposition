"use client"
import '@/app/admin/dashboard/[pageID]/form.css'
import deleteUser from "@/functions/deleteUser";

export default function EmailDelete({formID}: { formID: string }) {
    return (
        <button onClick={async (e) => {
            await deleteUser(formID)
        }} className="deleteButton">Delete</button>
    )
}