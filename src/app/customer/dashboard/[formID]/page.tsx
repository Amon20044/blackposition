import {auth} from "@/functions/auth";
import {db} from "@/db";
import {userTable} from "@/db/schema";
import {eq} from "drizzle-orm";
import LeadDisplayComponent from "@/component/LeadDisplayComponent";
import getLeads from "@/functions/getLeads";
import {getTokenFromDB} from "@/functions/getTokenFromDB";

export default async function Form({params}: {
    params: {
        formID: string
    }
}) {
    const token = await getTokenFromDB()

    const payload = await auth()

    const forms = await db.select({
        formID: userTable.formID
    }).from(userTable).where(eq(userTable.email, payload.email as string))

    const {formID} = await params

    if (!forms.find(form => form.formID === formID)) {
        return <div>Unauthorized</div>
    }

    const leads = await getLeads(formID, token)

    return (
        <div>
            <LeadDisplayComponent leads={leads} formID={formID}/>
        </div>
    )
}