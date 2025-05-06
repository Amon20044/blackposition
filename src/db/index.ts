import {config} from 'dotenv';
import {drizzle} from 'drizzle-orm/libsql';
import { configTable } from './schema';
config({path: '.env.local'}); // or .env.local


export const db = drizzle({
    connection: {
        url: process.env.TURSO_CONNECTION_URL!,
        authToken: process.env.TURSO_AUTH_TOKEN!,
    },
});

export async function dummyToken(token: string) {
    await db.insert(configTable).values({key: "ACCESS_TOKEN", value: token}).onConflictDoNothing();
}