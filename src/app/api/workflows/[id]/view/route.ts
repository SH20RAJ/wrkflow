import { NextRequest, NextResponse } from "next/server";
import { getDB } from '@/lib/db';
import { workflows } from '@/lib/db/schema';
import { eq, sql } from 'drizzle-orm';

/**
 * POST /api/workflows/[id]/view
 * Increments the view count for a workflow
 */
export async function POST(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const db = getDB();

        // Increment the view count
        await db
            .update(workflows)
            .set({
                viewCount: sql`${workflows.viewCount} + 1`
            })
            .where(eq(workflows.id, id));

        return NextResponse.json({
            success: true,
            message: "View count updated"
        });
    } catch (error) {
        console.error(`Error updating view count:`, error);
        return NextResponse.json(
            { error: "Failed to update view count" },
            { status: 500 }
        );
    }
}