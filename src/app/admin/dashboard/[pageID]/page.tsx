import getForms from "@/functions/getForms";
import {getTokenFromDB} from "@/functions/getTokenFromDB";
import "./form.css";
import CSVDownload from "@/component/CSVDownload";
import LeadDisplayComponent from "@/component/LeadDisplayComponent";
import getAdName from "@/functions/getAdName";
import {db} from "@/db";
import {userTable} from "@/db/schema";
import {eq} from "drizzle-orm";
import EmailDelete from "@/component/EmailDelete";

export default async function Page({params}: { params: { pageID: string } }) {
    const {pageID} = params; // Extract pageID from params
    const token = await getTokenFromDB();
    const leads = await getForms(token, params.pageID);
    const adName = (await getAdName(token, params.pageID)).name

    const clientData = await db.select().from(userTable).where(eq(userTable.formID, pageID))

    return (
        <div className="dashboard-container">
            {/* Main Content */}
            <div className="content">
                <header className="header-row">
                    {/* Routing Back Button */}
                    <a href="javascript:history.back()" className="back-button">
                        ← Back
                    </a>
                    <h1 className="font-bold text-xl">Forms</h1>
                    <h1 className="font-bold text-xl"></h1>
                </header>

                <div className="page-list">
                    <div>
                        {
                            clientData.length > 0 ?
                                (
                                    <>
                                        <h1>Client Email</h1>
                                        <h1>{clientData[0].email}</h1>
                                    </>
                                ) : null
                        }

                        <EmailDelete formID={params.pageID}/>
                    </div>
                    <div className="page-list-header">
                        <span>Title</span>
                        <span>Locale</span>
                        <span>Status</span>
                    </div>
                    <div className="">
                        <div className="CSVbutton">
                            <div className="bu">
                                <CSVDownload leads={leads}/>
                            </div>
                        </div>
                        <LeadDisplayComponent ad={adName} leads={leads} formID={pageID} admin={true}/>
                    </div>
                </div>
            </div>
        </div>
    );
}
