import { NextResponse } from 'next/server';

export async function GET() {
    return NextResponse.json({
        NODE_ENV: process.env.NODE_ENV,
        CLOUDFLARE_D1_DATABASE_ID_DEV: process.env.CLOUDFLARE_D1_DATABASE_ID_DEV,
        CLOUDFLARE_D1_DATABASE_ID_PROD: process.env.CLOUDFLARE_D1_DATABASE_ID_PROD,
        CLOUDFLARE_ACCOUNT_ID: process.env.CLOUDFLARE_ACCOUNT_ID,
        isDevelopment: process.env.NODE_ENV !== "production",
        expectedDatabaseId: process.env.NODE_ENV === "production" 
            ? process.env.CLOUDFLARE_D1_DATABASE_ID_PROD || "101bf744-d0ac-4832-b6b2-e56eabbebe31"
            : process.env.CLOUDFLARE_D1_DATABASE_ID_DEV || "3f5e54bf-b024-43ac-9061-cd14bb018101"
    });
}
