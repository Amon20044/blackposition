import { auth } from "@/functions/auth";
import { db } from "@/db";
import { userTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import Link from "next/link";
import "./cust.css"

export default async function CustomerDashboard() {
    const payload = await auth();

    const forms = await db.select({
        formID: userTable.formID
    }).from(userTable).where(eq(userTable.email, payload.email as string));

    return (
        <div className="customer-dashboard-container">
            <div className="customer-dashboard-header">
                Your Forms
            </div>
            <div className="forms-list">
                {forms.map((form, index) => (
                    <div key={form.formID} className="form-item">
                        <div>
                            Sr. No: {index + 1}  {/* Displaying serial number */}
                        </div>
                        <Link href={`${process.env.HOST}/customer/dashboard/${form.formID}`}>
                            {form.formID}
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}
