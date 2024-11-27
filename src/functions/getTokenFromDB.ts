import {db} from "@/db";
import {configTable} from "@/db/schema";
import {eq} from "drizzle-orm";

export async function getTokenFromDB() {
    const [{value}] = await db.select({
        value: configTable.value
    }).from(configTable).where(eq(configTable.key, "ACCESS_TOKEN"))

    return value
}