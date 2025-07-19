"use server";

import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { workflows, users } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { getCurrentUser } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function createWorkflow(formData: FormData) {
    try {
        const user = await getCurrentUser();
        
        if (!user) {
            redirect("/handler/sign-in");
        }

        // Ensure user exists in our database
        const existingUser = await db
            .select()
            .from(users)
            .where(eq(users.id, user.id))
            .limit(1);

        if (existingUser.length === 0) {
            await db.insert(users).values({
                id: user.id,
                email: user.primaryEmail || user.id + "@example.com",
                name: user.displayName || "User",
                avatar: user.profileImageUrl || null,
                bio: null,
            });
        }

        const title = formData.get("title") as string;
        const description = formData.get("description") as string;
        const jsonContent = formData.get("jsonContent") as string;
        const isPaid = formData.get("isPaid") === "on";
        const price = isPaid ? parseFloat(formData.get("price") as string) || 0 : null;
        const howItWorks = formData.get("howItWorks") as string;
        const stepByStep = formData.get("stepByStep") as string;

        // Validation
        if (!title?.trim()) {
            throw new Error("Title is required");
        }

        if (!description?.trim()) {
            throw new Error("Description is required");
        }

        if (!jsonContent?.trim()) {
            throw new Error("Workflow JSON content is required");
        }

        // Validate JSON format
        try {
            JSON.parse(jsonContent);
        } catch (error) {
            throw new Error("Invalid JSON format. Please check your workflow JSON.");
        }

        const [newWorkflow] = await db
            .insert(workflows)
            .values({
                title: title.trim(),
                description: description.trim(),
                userId: user.id,
                jsonContent: jsonContent.trim(),
                isPaid,
                price,
                howItWorks: howItWorks?.trim() || null,
                stepByStep: stepByStep?.trim() || null,
            })
            .returning();

        revalidatePath("/dashboard");
        revalidatePath("/workflows");
        
        redirect(`/workflows/${newWorkflow.id}`);
    } catch (error) {
        console.error("Error creating workflow:", error);
        // In a real app, you'd want to handle this error properly
        // For now, we'll redirect back with an error
        redirect("/workflows/new?error=" + encodeURIComponent((error as Error).message));
    }
}