import { auth } from "@/functions/auth";
import { db } from "@/db";
import { userTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import LeadDisplayComponent from "@/component/LeadDisplayComponent";
import { getLeads } from "@/functions/getLeads";
import { getTokenFromDB } from "@/functions/getTokenFromDB";
import getAdName from "@/functions/getAdName";
import '../cust.css'
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
    const adName = (await getAdName(token, formID)).name
    return (
        <div>
            <div className="absolute z-10 bottom-0 right-0 flex items-center gap-4 p-4 download-button">
                <CSVDownload leads={{ data: leads, name: adName }} />
            </div>
            <LeadDisplayComponent leads={leads} formID={formID} adname={adName} />
        </div>
    )
}