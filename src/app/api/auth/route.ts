import {NextRequest, NextResponse} from "next/server";
import {exchangeCode} from "@/functions/exchangeCode";
import getLongLivedAccessToken from "@/functions/getLongLivedAccessToken";
import {getMe} from "@/functions/getMe";
import {db} from "@/db";
import {configTable} from "@/db/schema";
import {eq} from "drizzle-orm";
import {cookies} from "next/headers";
import jose, {SignJWT} from "jose"

export async function GET(req: NextRequest) {
    const code = req.nextUrl.searchParams.get("code")

    if (!code) {
        return NextResponse.redirect(`${process.env.HOST}/`)
    }

    const {access_token: shortAccessToken} = await exchangeCode(code)

    const longAccessToken = await getLongLivedAccessToken(shortAccessToken)

    const me = await getMe(longAccessToken.access_token)
    console.log("YEAA", me.email, longAccessToken)
    if (me.email !== process.env.ADMIN_EMAIL) {
        return NextResponse.redirect(`${process.env.HOST}/?error=NOT_ADMIN`)
    } else {
        const token = await db.update(configTable).set({value: longAccessToken.access_token}).where(eq(configTable.key, "ACCESS_TOKEN"))
        const payload = {
            id: me.id,
            email: me.email,
            role: "admin"
        }

        const jwt = await new SignJWT(payload)
            .setProtectedHeader({alg: "HS256"})
            .setIssuedAt()
            .setExpirationTime("4w")
            .sign(new TextEncoder().encode(process.env.AUTH_SECRET));


        const smth = (await cookies()).set("token", jwt)

        return NextResponse.redirect(`${process.env.HOST}/admin/dashboard`)
    }

}