// export * from './auth/authentication'
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'

export const users = sqliteTable('user', {
    id: text('id').notNull().primaryKey(),
    name: text('name').notNull(),
    email: text('email').notNull().unique(),
    password: text('password').notNull(), // IMPORTANT: This is not secure for production use
})

export const sessions = sqliteTable('session', {
    id: text('id').notNull().primaryKey(),
    userId: text('user_id')
        .notNull()
        .references(() => users.id),
    expiresAt: integer('expires_at').notNull(),
})
