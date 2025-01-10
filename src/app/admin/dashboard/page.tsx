import getAds from "@/functions/getAds";
import {getTokenFromDB} from "@/functions/getTokenFromDB";
import Link from "next/link";
import './admin.css'
import getAdAccounts from "@/functions/getAdAccounts";

export default async function Dashboard() {
    const accessToken = await getTokenFromDB();
    const accounts = await getAdAccounts(accessToken);

    const pages = await getAds(accessToken, "act_435796140303126") as {
        data: {
            access_token: string,
            name: string,
            id: string,
            category: string,
            category_list: any[],
            tasks: any[]
        }[]
    };

    return (
        <div className="dashboard-container">
            {/* Main Content */}
            <main className="content">
                <div className="">
                    <h1 className='font-bold text-center text-xl '>Pages</h1>
                </div>

                <div className="page-list">
                    <div className="page-list-header">
                        <span>Title</span>
                        <span>Client</span>
                    </div>
                    {
                        pages.data && pages.data.length > 0 ? (
                            pages.data.map((page) => (
                                <div key={page.id} className="page-item">
                                    <Link href={`${process.env.HOST}/admin/dashboard/${page.id}`}>
                                        <span>{page.name}</span>
                                    </Link>
                                    <span>-</span>
                                </div>
                            ))
                        ) : (
                            <div key={"err"} className="page-item">
                                <span>{"No Pages associated to your account!"}</span>
                                <span>-</span>
                            </div>
                        )
                    }
                </div>
            </main>
        </div>
    );
}
