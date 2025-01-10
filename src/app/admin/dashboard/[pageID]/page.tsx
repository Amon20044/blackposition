import getForms from "@/functions/getForms";
import {getTokenFromDB} from "@/functions/getTokenFromDB";
import Link from "next/link";
import "./form.css";
import CSVDownload from "@/component/CSVDownload";
import LeadDisplayComponent from "@/component/LeadDisplayComponent";

export default async function Page({params}: { params: { pageID: string } }) {
    const {pageID} = params; // Extract pageID from params
    const token = await getTokenFromDB();
    const leads = await getForms(token, params.pageID);
    console.log(leads)

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
                        <LeadDisplayComponent leads={leads} formID={pageID} admin={true}/>
                    </div>
                </div>
            </div>
        </div>
    );
}
