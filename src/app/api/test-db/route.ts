import { NextRequest, NextResponse } from 'next/server';
import { getDB } from '@/lib/db';
import { users } from '@/lib/db/schema';

export async function GET() {
    try {
        const db = getDB();
        
        // Test 1: Check if we can connect to the database
        const result = await db.select().from(users).limit(1);
        
        return NextResponse.json({
            success: true,
            message: 'Database connection successful',
            userCount: result.length,
            firstUser: result[0] || null
        });
    } catch (error) {
        console.error('Database test error:', error);
        return NextResponse.json({
            success: false,
            error: error instanceof Error ? error.message : 'Unknown error'
        }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    try {
        const db = getDB();
        
        // Test 2: Try to create a test user
        const testUser = {
            id: 'test-user-' + Date.now(),
            email: 'test@example.com',
            name: 'Test User',
            avatar: null,
            bio: 'Test user for database connectivity'
        };
        
        await db.insert(users).values(testUser);
        
        return NextResponse.json({
            success: true,
            message: 'Test user created successfully',
            user: testUser
        });
    } catch (error) {
        console.error('Database insert error:', error);
        return NextResponse.json({
            success: false,
            error: error instanceof Error ? error.message : 'Unknown error'
        }, { status: 500 });
    }
}
