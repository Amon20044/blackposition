import {getForms} from "@/functions/getForms";
import { getTokenFromDB } from "@/functions/getTokenFromDB";
import getAdName from "@/functions/getAdName";
import { db } from "@/db";
import { userTable } from "@/db/schema";
import { eq } from "drizzle-orm";

import CSVDownload from "@/component/CSVDownload";
import LeadDisplayComponent from "@/component/LeadDisplayComponent";


import "./form.css";

export interface clientData {
    id: string;
    email: string;
    formID: string;
}

export default async function Page({ params }: { params: { pageID: string } }) {
    const { pageID } = params;

    const token = await getTokenFromDB();
    const leads = await getForms(token, pageID);
    const adName = (await getAdName(token, pageID)).name;
    const clientData : clientData[] = await db.select().from(userTable).where(eq(userTable.formID, pageID));
    console.log(clientData[0]);
    return (
        <div className="dashboard-container">
            <div className="form-content">
                
                {/* Actions */}
                    <CSVDownload leads={{ data: leads, name: adName }} />
                

                {/* Lead Display */}
                <LeadDisplayComponent
                    leads={leads}
                    formID={pageID}
                    admin={true}
                    adname={adName}
                    clientData={clientData[0]}
                />
            </div>
        </div>
    );
}
