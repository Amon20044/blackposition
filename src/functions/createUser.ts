"use server"

import {z} from "zod";
import {db} from "@/db";
import {userTable} from "@/db/schema";
import {randomUUID} from "node:crypto";
import {eq} from "drizzle-orm";
import bcrypt from "bcrypt"
import {auth} from "@/functions/auth";

export async function createUser(input: { email: string, password: string, formID: string }) {
    try {
        const payload = await auth()
        if (payload.role !== "admin") {
            return {
                error: "Unauthorized"
            }
        }
    } catch (e) {
        console.error(e)
        return {
            error: "Unauthorized"
        }
    }

    try {
        const {email, password, formID} = z.object({
            email: z.string(),
            password: z.string(),
            formID: z.string()
        }).parse(input)

        try {
            const user = await db.select({
                id: userTable.id
            }).from(userTable).where(eq(userTable.formID, formID))

            const hash = await bcrypt.hash(password, 10)

            if (user[0] && user[0].id) {
                await db.update(userTable).set({
                    email,
                    password: hash
                }).where(eq(userTable.formID, formID))
            } else {
                await db.insert(userTable).values({
                    id: randomUUID().toString(),
                    email,
                    password: hash,
                    formID
                })
            }
            return {
                success: "Success",
                email
            }
        } catch (e) {
            console.error(e)
            return {
                "error": "Failed to create user"
            }
        }
    } catch (e) {
        console.error(e)
        return {
            error: "Invalid input"
        }
    }
}