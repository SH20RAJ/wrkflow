import dotenv from 'dotenv';
import { getDB } from '../src/lib/db';
import { workflows } from '../src/lib/db/schema';
import { generateUniqueSlug } from '../src/lib/slug-utils';

// Load environment variables
dotenv.config({ path: '.env.local' });

async function createTestWorkflow() {
    console.log('Creating test workflow with slug...');

    const db = getDB();

    try {
        const testSlug = await generateUniqueSlug('My Awesome Test Workflow');

        const [newWorkflow] = await db
            .insert(workflows)
            .values({
                title: 'My Awesome Test Workflow',
                slug: testSlug,
                description: 'This is a test workflow to verify slug functionality works correctly.',
                userId: 'ef0684db-79cc-448f-bdaf-d8b0954f1605', // Real user ID
                jsonContent: '{"nodes": [], "connections": {}}',
                isPaid: false,
                isPrivate: false,
                viewCount: 0,
                downloadCount: 0,
            })
            .returning();

        console.log(`✅ Created test workflow:`);
        console.log(`   ID: ${newWorkflow.id}`);
        console.log(`   Title: ${newWorkflow.title}`);
        console.log(`   Slug: ${newWorkflow.slug}`);
        console.log(`   URL: http://localhost:3000/workflows/w/${newWorkflow.slug}`);

    } catch (error) {
        console.error('❌ Error creating test workflow:', error);
    }
}

// Run the script
createTestWorkflow().catch(console.error);