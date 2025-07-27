import dotenv from 'dotenv';
import { getDB } from '../src/lib/db';
import { workflows } from '../src/lib/db/schema';

// Load environment variables
dotenv.config({ path: '.env.local' });

async function clearWorkflows() {
    console.log('Clearing existing workflows...');

    const db = getDB();

    try {
        const result = await db.delete(workflows);
        console.log('✅ Successfully cleared all workflows');
        return result;
    } catch (error) {
        console.error('❌ Error clearing workflows:', error);
        throw error;
    }
}

// Run the script
clearWorkflows().catch(console.error);