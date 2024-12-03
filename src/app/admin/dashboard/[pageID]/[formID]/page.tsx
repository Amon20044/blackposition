import { getTokenFromDB } from "@/functions/getTokenFromDB";
import getLeads from "@/functions/getLeads";
import LeadDisplayComponent from "@/component/LeadDisplayComponent";
import CSVDownload from "@/component/CSVDownload";
import "./csvButton.css"

export default async function Form({ params }: {
    params: {
        pageID: string,
        formID: string
    }
}) {
    const { formID } = await params

    const token = await getTokenFromDB()


    const leads = await getLeads(formID, token)
    console.log(JSON.stringify(leads, null, 5))

    return (
        <div className="">
            <div className="CSVbutton">
                <div className="bu">
                    <CSVDownload leads={leads} />
                </div>
            </div>
            <LeadDisplayComponent leads={leads} formID={formID} admin={true} />
        </div>
    )
}