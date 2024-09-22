import type { Config } from 'drizzle-kit'
import { env } from 'env'

export default {
    schema: 'src/core/server/schema/user.ts',
    out: './src/core/server/migrations',
    driver: 'turso',
    dialect: 'sqlite',
    dbCredentials: {
        url: env.DATABASE_URL,
        authToken: env.DATABASE_AUTH_TOKEN,
    },
} satisfies Config
