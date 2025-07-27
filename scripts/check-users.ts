import dotenv from 'dotenv';
import { getDB } from '../src/lib/db';
import { users } from '../src/lib/db/schema';

// Load environment variables
dotenv.config({ path: '.env.local' });

async function checkUsers() {
    console.log('Checking users in database...');

    const db = getDB();

    try {
        const allUsers = await db
            .select({
                id: users.id,
                email: users.email,
                name: users.name,
            })
            .from(users)
            .limit(5);

        console.log(`Found ${allUsers.length} users:`);
        allUsers.forEach(user => {
            console.log(`- ID: ${user.id}, Email: ${user.email}, Name: ${user.name || 'NULL'}`);
        });

        if (allUsers.length > 0) {
            console.log(`\nYou can use user ID: ${allUsers[0].id} for testing`);
        }
    } catch (error) {
        console.error('Error checking users:', error);
    }
}

// Run the script
checkUsers().catch(console.error);