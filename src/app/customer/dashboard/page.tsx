// CustomerDashboard.tsx
import { auth } from "@/functions/auth";
import { db } from "@/db";
import { userTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import Link from "next/link";
import './cust.css';
import { getTokenFromDB } from "@/functions/getTokenFromDB";
import getAdName from "@/functions/getAdName";
import hero from "@/public/heroLead.png";
import Image from "next/image";
import logo from "@/public/blackPosition.svg";

export default async function CustomerDashboard() {
    const accessToken = await getTokenFromDB();
    const payload = await auth();

    let forms;
    try {
        forms = await db
            .select({
                formID: userTable.formID,
            })
            .from(userTable)
            .where(eq(userTable.email, payload.email as string));
        console.log(JSON.stringify(forms));
    } catch (error) {
        console.error("Error fetching forms:", error);
    }

    return (
        <div className="dashboard-container bg-black">
            <div className="hero-section">
                <Image
                    src={hero}
                    alt="Hero Background"
                    className="hero-image"
                />
                <div className="logo-wrapper">
                    <Image
                        src={logo}
                        alt="logo"
                        className="logo-image"
                    />
                </div>
            </div>

            <div className="content-section">
                <div className="section-title">My Ads</div>
                <div className="ads-grid">
                    {forms && forms.length > 0 ? (
                        forms.map(async (form, index) => {
                            const adName = await getAdName(accessToken, form.formID);
                            console.log(adName)
                            return (
                                <div key={form.formID} className="ad-card">
                                    <Link href={`${process.env.HOST}/customer/dashboard/${form.formID}`} className="ad-link">
                                        <div className="ad-content">
                                            <div className="ad-index">{index + 1}.</div>
                                            <div className="ad-name">{adName.name}</div>
                                        </div>
                                        <svg
                                            className="arrow-icon"
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="15"
                                            height="16"
                                            viewBox="0 0 15 16"
                                            fill="none"
                                        >
                                            <path
                                                d="M14.9398 1.65887C14.9398 1.10659 14.492 0.658874 13.9398 0.658874L4.93976 0.658874C4.38747 0.658874 3.93976 1.10659 3.93976 1.65887C3.93976 2.21116 4.38747 2.65887 4.93976 2.65887H12.9398V10.6589C12.9398 11.2112 13.3875 11.6589 13.9398 11.6589C14.492 11.6589 14.9398 11.2112 14.9398 10.6589L14.9398 1.65887ZM1.47395 15.5389L14.6469 2.36598L13.2327 0.951767L0.0597389 14.1247L1.47395 15.5389Z"
                                                fill="#6B6B6B"
                                            />
                                        </svg>
                                    </Link>
                                </div>
                            );
                        })
                    ) : (
                        <div className="no-ads">
                            <h2 className="no-ads-title">No Ads Found</h2>
                            <p className="no-ads-message">Looks like you dont Have any Ads Running</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}