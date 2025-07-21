import { getDB } from "@/lib/db";
import { users } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export async function syncUserToDatabase(stackUser: any) {
    if (!stackUser) return null;

    try {
        const db = getDB();
        // Check if user already exists
        const existingUser = await db
            .select()
            .from(users)
            .where(eq(users.id, stackUser.id))
            .limit(1);

        if (existingUser.length === 0) {
            // Create new user
            await db.insert(users).values({
                id: stackUser.id,
                email: stackUser.primaryEmail || stackUser.id + "@example.com",
                name: stackUser.displayName || "User",
                avatar: stackUser.profileImageUrl || null,
                bio: null,
            });
            
            console.log("Created new user in database:", stackUser.id);
        }

        return stackUser;
    } catch (error) {
        console.error("Error syncing user to database:", error);
        return stackUser; // Return user even if sync fails
    }
}