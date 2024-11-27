import {sqliteTable, text} from 'drizzle-orm/sqlite-core';

export const configTable = sqliteTable('config', {
    key: text('key').unique().notNull(),
    value: text('value').notNull(),
});

export const userTable = sqliteTable('user', {
    id: text('id').primaryKey(),
    email: text('email').notNull(),
    password: text('password').notNull(),
    formID: text('formID').notNull().unique(),
});

export type InsertConfig = typeof configTable.$inferInsert;
export type SelectConfig = typeof configTable.$inferSelect;