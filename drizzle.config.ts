import type { Config } from 'drizzle-kit';

export default {
    schema: './src/lib/db/schema/*',
    out: './drizzle',
    dialect: 'sqlite',
    driver: 'd1-http',
    dbCredentials: {
        databaseId: '101bf744-d0ac-4832-b6b2-e56eabbebe31',
        token: process.env.CLOUDFLARE_API_TOKEN || '',
        accountId: process.env.CLOUDFLARE_ACCOUNT_ID || '',
    },
} satisfies Config;