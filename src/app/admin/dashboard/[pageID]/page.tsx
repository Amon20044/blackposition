import getForms from "@/functions/getForms";
import getPageTokens from "@/functions/getPageTokens";
import {getTokenFromDB} from "@/functions/getTokenFromDB";
import Link from "next/link";


export default async function Page({ params }: { params: { pageID: string } }) {
    const { pageID } = params; // Extract pageID from params
    const token = await getTokenFromDB();

    const page = await getPageTokens(token);
    const pageAccessToken = page.data.find((page: { id: string }) => page.id === pageID).access_token;
    const forms = await getForms(pageAccessToken);

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
                </header>

                <div className="page-list">
                    <div className="page-list-header">
                        <span>Title</span>
                        <span>Locale</span>
                        <span>Status</span>
                    </div>
                    {forms.data.map((form: { id: string, locale: string, name: string, status: string }) => (
                        <div key={form.id} className="page-item">
                            <Link href={`${process.env.HOST}/admin/dashboard/${pageID}/${form.id}`}>
                                <span>{form.name}</span>
                            </Link>
                            <span>{form.locale}</span>
                            <span>{form.status}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
