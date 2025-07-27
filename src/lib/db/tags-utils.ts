import { getDB } from '@/lib/db';
import { tags, workflowsToTags } from '@/lib/db/schema/tags';
import { eq, inArray } from 'drizzle-orm';

/**
 * Create or get existing tags and return their IDs
 */
export async function createOrGetTags(tagNames: string[]): Promise<string[]> {
    if (!tagNames.length) return [];

    const db = getDB();
    const tagIds: string[] = [];

    for (const tagName of tagNames) {
        // Check if tag exists
        const existingTag = await db
            .select({ id: tags.id })
            .from(tags)
            .where(eq(tags.name, tagName.trim()))
            .limit(1);

        if (existingTag.length > 0) {
            tagIds.push(existingTag[0].id);
        } else {
            // Create new tag
            const [newTag] = await db
                .insert(tags)
                .values({
                    name: tagName.trim(),
                })
                .returning({ id: tags.id });

            tagIds.push(newTag.id);
        }
    }

    return tagIds;
}

/**
 * Associate tags with a workflow
 */
export async function associateTagsWithWorkflow(workflowId: string, tagIds: string[]): Promise<void> {
    if (!tagIds.length) return;

    const db = getDB();

    // First, remove existing associations
    await db
        .delete(workflowsToTags)
        .where(eq(workflowsToTags.workflowId, workflowId));

    // Then, create new associations
    const associations = tagIds.map(tagId => ({
        workflowId,
        tagId,
    }));

    await db.insert(workflowsToTags).values(associations);
}

/**
 * Get tags for a workflow
 */
export async function getWorkflowTags(workflowId: string) {
    const db = getDB();

    return await db
        .select({
            id: tags.id,
            name: tags.name,
        })
        .from(tags)
        .innerJoin(workflowsToTags, eq(tags.id, workflowsToTags.tagId))
        .where(eq(workflowsToTags.workflowId, workflowId));
}

/**
 * Remove all tag associations for a workflow
 */
export async function removeWorkflowTags(workflowId: string): Promise<void> {
    const db = getDB();

    await db
        .delete(workflowsToTags)
        .where(eq(workflowsToTags.workflowId, workflowId));
}