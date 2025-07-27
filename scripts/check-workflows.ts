import dotenv from 'dotenv';
import { getDB } from '../src/lib/db';
import { workflows } from '../src/lib/db/schema';

// Load environment variables
dotenv.config({ path: '.env.local' });

async function checkWorkflows() {
    console.log('Checking workflows in database...');

    const db = getDB();

    try {
        const allWorkflows = await db
            .select({
                id: workflows.id,
                title: workflows.title,
                slug: workflows.slug,
            })
            .from(workflows)
            .limit(10);

        console.log(`Found ${allWorkflows.length} workflows:`);
        allWorkflows.forEach(workflow => {
            console.log(`- ID: ${workflow.id}, Title: "${workflow.title}", Slug: "${workflow.slug || 'NULL'}"`);
        });
    } catch (error) {
        console.error('Error checking workflows:', error);
    }
}

// Run the script
checkWorkflows().catch(console.error);