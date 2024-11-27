"use server"

import {z} from "zod";
import {db} from "@/db";
import {userTable} from "@/db/schema";
import {eq} from "drizzle-orm";
import bcrypt from "bcrypt";
import {cookies} from "next/headers";
import {SignJWT} from "jose";
import {redirect} from "next/navigation";

export default async function loginUser({email, password}: { email: string, password: string }) {
    try {
        const formObject = z.object({
            email: z.string(),
            password: z.string()
        }).strict().parse({email, password})

        try {
            const user = await db.select({
                id: userTable.id,
                email: userTable.email,
                password: userTable.password
            }).from(userTable).where(eq(userTable.email, formObject.email))

            console.log(user)

            if (user[0] && await bcrypt.compare(password, user[0].password)) {
                const payload = {
                    id: user[0].id,
                    email: user[0].email,
                    role: "user"
                }

                const jwt = await new SignJWT(payload)
                    .setProtectedHeader({alg: "HS256"})
                    .setIssuedAt()
                    .setExpirationTime("4w")
                    .sign(new TextEncoder().encode(process.env.AUTH_SECRET));

                (await cookies()).set("token", jwt)

                console.log(jwt)

                return {
                    success: "Logged in",
                    email: user[0].email
                }
            } else {
                return {
                    error: "Invalid login data"
                }
            }
        } catch (e) {
            return {
                error: "Invalid login data"
            }
        }
    } catch (e) {
        return {
            error: "Invalid login data"
        }
    }
}