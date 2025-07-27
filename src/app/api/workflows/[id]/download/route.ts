import { NextRequest, NextResponse } from "next/server";
import { getDB } from '@/lib/db';
import { workflows } from '@/lib/db/schema';
import { eq, sql } from 'drizzle-orm';

/**
 * POST /api/workflows/[id]/download
 * Increments the download count for a workflow
 */
export async function POST(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const db = getDB();

        // Increment the download count
        await db
            .update(workflows)
            .set({
                downloadCount: sql`${workflows.downloadCount} + 1`
            })
            .where(eq(workflows.id, id));

        return NextResponse.json({
            success: true,
            message: "Download count updated"
        });
    } catch (error) {
        console.error(`Error updating download count:`, error);
        return NextResponse.json(
            { error: "Failed to update download count" },
            { status: 500 }
        );
    }
}