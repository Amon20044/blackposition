import { sqliteTable, AnySQLiteColumn, uniqueIndex, text } from "drizzle-orm/sqlite-core"
  import { sql } from "drizzle-orm"

export const config = sqliteTable("config", {
	key: text().notNull(),
	value: text().notNull(),
},
(table) => {
	return {
		keyUnique: uniqueIndex("config_key_unique").on(table.key),
	}
});

export const user = sqliteTable("user", {
	id: text().primaryKey().notNull(),
	email: text().notNull(),
	password: text().notNull(),
	formId: text().notNull(),
},
(table) => {
	return {
		formIdUnique: uniqueIndex("user_formID_unique").on(table.formId),
	}
});

