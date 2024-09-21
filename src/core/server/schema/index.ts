import generateUUID from '@/core/utils/generate-uuid'
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'

export const users = sqliteTable('user', {
    id: text('id')
        .notNull()
        .primaryKey()
        .$default(() => generateUUID()),
    name: text('name').notNull(),
    email: text('email').notNull().unique(),
    password: text('password').notNull(),
})

export const sessions = sqliteTable('session', {
    id: text('id').notNull().primaryKey(),
    userId: text('user_id')
        .notNull()
        .references(() => users.id),
    expiresAt: integer('expires_at').notNull(),
})

export const userProfiles = sqliteTable('user_profile', {
    id: text('id')
        .notNull()
        .primaryKey()
        .$default(() => generateUUID()),
    userId: text('user_id')
        .notNull()
        .references(() => users.id)
        .unique(),
    firstName: text('first_name'),
    lastName: text('last_name'),
    bio: text('bio'),
    dateOfBirth: text('date_of_birth'),
    address: text('address'),
    language: text('language').default('en'),
    appTheme: text('app_theme').default('system'),
    email: text('email'),
})
