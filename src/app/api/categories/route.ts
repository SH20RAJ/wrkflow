import { NextResponse } from 'next/server';
import { getDB } from '@/lib/db';
import { categories, workflows } from '@/lib/db/schema';
import { eq, count } from 'drizzle-orm';

export async function GET() {
    try {
        const db = getDB();
        
        // Get categories with workflow counts
        const categoriesWithCounts = await db
            .select({
                id: categories.id,
                name: categories.name,
                description: categories.description,
                count: count(workflows.id),
            })
            .from(categories)
            .leftJoin(workflows, eq(categories.id, workflows.categoryId))
            .groupBy(categories.id, categories.name, categories.description);

        return NextResponse.json({
            success: true,
            categories: categoriesWithCounts,
        });
    } catch (error) {
        console.error('Error fetching categories:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to fetch categories' },
            { status: 500 }
        );
    }
}
