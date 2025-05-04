import {cookies} from "next/headers";
import {jwtVerify} from "jose";
import {NextRequest} from "next/server";

export async function auth(req?: NextRequest) {

    const jwt = req ? req.cookies.get("token")?.value || "" : (await cookies()).get("token")?.value || ""

    const secret = new TextEncoder().encode(process.env.AUTH_SECRET);
    const {payload} = await jwtVerify(
        jwt,
        secret,
    );
    return payload;
}