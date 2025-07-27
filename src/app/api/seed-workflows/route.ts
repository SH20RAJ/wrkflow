import { NextRequest, NextResponse } from 'next/server';
import { seedWorkflows } from '../../../../scripts/seed-workflows';

export async function POST(request: NextRequest) {
    try {
        // Optional: Add authentication check here
        const { searchParams } = new URL(request.url);
        const secret = searchParams.get('secret');
        
        // Simple secret check (in production, use proper authentication)
        if (secret !== 'seed-workflows-2025') {
            return NextResponse.json(
                { success: false, error: 'Unauthorized' },
                { status: 401 }
            );
        }

        const result = await seedWorkflows();
        
        return NextResponse.json({
            success: true,
            message: `Successfully seeded ${result.count} workflows`,
            result
        });
    } catch (error) {
        console.error('Error seeding workflows:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to seed workflows' },
            { status: 500 }
        );
    }
}

export async function GET() {
    return NextResponse.json({
        message: 'Use POST method with ?secret=seed-workflows-2025 to seed workflows'
    });
}
