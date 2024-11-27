import {getTokenFromDB} from "@/functions/getTokenFromDB";
import getLeads from "@/functions/getLeads";
import LeadDisplayComponent from "@/component/LeadDisplayComponent";

export default async function Form({params}: {
    params: {
        pageID: string,
        formID: string
    }
}) {
    const {formID} = await params

    const token = await getTokenFromDB()


    const leads = await getLeads(formID, token)
    console.log(JSON.stringify(leads, null, 5))

    return (
        <div className="">
            <LeadDisplayComponent leads={leads} formID={formID} admin={true}/>
        </div>
    )
}