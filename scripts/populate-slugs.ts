import dotenv from 'dotenv';
import { getDB } from '../src/lib/db';
import { workflows } from '../src/lib/db/schema';
import { generateUniqueSlug } from '../src/lib/slug-utils';
import { eq } from 'drizzle-orm';

// Load environment variables
dotenv.config({ path: '.env.local' });

async function populateSlugs() {
    console.log('Starting slug population...');

    const db = getDB();

    // Get all workflows without slugs
    const workflowsWithoutSlugs = await db
        .select({
            id: workflows.id,
            title: workflows.title,
            slug: workflows.slug,
        })
        .from(workflows);

    console.log(`Found ${workflowsWithoutSlugs.length} workflows to process`);

    for (const workflow of workflowsWithoutSlugs) {
        if (!workflow.slug) {
            try {
                const newSlug = await generateUniqueSlug(workflow.title);

                await db
                    .update(workflows)
                    .set({ slug: newSlug })
                    .where(eq(workflows.id, workflow.id));

                console.log(`Updated workflow "${workflow.title}" with slug: ${newSlug}`);
            } catch (error) {
                console.error(`Failed to update workflow ${workflow.id}:`, error);
            }
        }
    }


}

// Run the script
populateSlugs().catch(console.error);