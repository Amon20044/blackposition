import { auth } from "@/functions/auth";
import { db } from "@/db";
import { userTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import LeadDisplayComponent from "@/component/LeadDisplayComponent";
import getLeads from "@/functions/getLeads";
import { getTokenFromDB } from "@/functions/getTokenFromDB";
import getAdName from "@/functions/getAdName";

import CSVDownload from "@/component/CSVDownload";
export default async function Form({ params }: {
    params: {
        formID: string
    }
}) {
    const token = await getTokenFromDB()

    const payload = await auth()

    const forms = await db.select({
        formID: userTable.formID
    }).from(userTable).where(eq(userTable.email, payload.email as string))

    const { formID } = await params

    if (!forms.find(form => form.formID === formID)) {
        return <div>Unauthorized</div>
    }

    const leads = await getLeads(formID, token)
    const adName = await getAdName(token, formID);
    return (
        <div>
            <div
             style={{
                color:'white',
                position: "fixed",
                bottom: "20px",
                right: "20px",
                zIndex: 999,
                backgroundColor: "#34A853",
                padding: "16px",
                borderRadius: '2rem',
                boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
            }}>
            <CSVDownload leads={leads}/>
            </div>
            <LeadDisplayComponent leads={leads} formID={formID} adname={adName.name} />
        </div>
    )
}