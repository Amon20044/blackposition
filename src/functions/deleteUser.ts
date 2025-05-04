"use server"

import {db} from "@/db";
import {userTable} from "@/db/schema";
import {eq} from "drizzle-orm";

export default async function deleteUser(formID: string) {
    await db.delete(userTable).where(eq(userTable.formID, formID))
}