import getPageTokens from "@/functions/getPageTokens";
import {getTokenFromDB} from "@/functions/getTokenFromDB";
import Link from "next/link";
import './admin.css'


export default async function Dashboard() {
    const accessToken = await getTokenFromDB();
    const pages = await getPageTokens(accessToken);

    return (
        <div className="dashboard-container">
            {/* Main Content */}
            <main className="content">
                <header>
                    <h1 className='font-bold text-xl'>Pages</h1>
                </header>

                <div className="page-list">
                    <div className="page-list-header">
                        <span>Title</span>
                        <span>Client</span>
                        <span>Shared</span>
                        <span>Not Shared</span>
                    </div>
                    {pages.data.map((page: {
                        access_token: string,
                        name: string,
                        id: string,
                        category: string,
                        category_list: any[],
                        tasks: any[]
                    }) => (
                        <div key={page.id} className="page-item">
                            <Link href={`${process.env.HOST}/admin/dashboard/${page.id}`}>
                                <span>{page.name}</span>
                            </Link>
                            <span>-</span>
                            <span>-</span>
                            <span>-</span>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}
