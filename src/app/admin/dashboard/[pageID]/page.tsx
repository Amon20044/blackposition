import getForms from "@/functions/getForms";
import { getTokenFromDB } from "@/functions/getTokenFromDB";
import getAdName from "@/functions/getAdName";
import { db } from "@/db";
import { userTable } from "@/db/schema";
import { eq } from "drizzle-orm";

import CSVDownload from "@/component/CSVDownload";
import LeadDisplayComponent from "@/component/LeadDisplayComponent";
import EmailDelete from "@/component/EmailDelete";

import "./form.css";

export default async function Page({ params }: { params: { pageID: string } }) {
    const { pageID } = params;

    const token = await getTokenFromDB();
    const leads = await getForms(token, pageID);
    const adName = (await getAdName(token, pageID)).name;
    const clientData = await db.select().from(userTable).where(eq(userTable.formID, pageID));

    return (
        <div className="dashboard-container">
            <div className="form-content">
                {/* Client Info */}
                {clientData.length > 0 && (
                    <div className="client-info">
                        <h2>Client Email</h2>
                        <p>{clientData[0].email}</p>
                        <EmailDelete formID={pageID} />
                    </div>
                )}

                {/* Actions */}
                <div className="absolute z-10 bottom-0 right-0 flex items-center gap-4 p-4">
                    <CSVDownload leads={leads} />
                </div>

                {/* Lead Display */}
                <LeadDisplayComponent
                    leads={leads}
                    formID={pageID}
                    admin={true}
                    adname={adName}
                />
            </div>
        </div>
    );
}
