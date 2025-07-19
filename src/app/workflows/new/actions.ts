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

        // User should already be synced by getCurrentUser, but ensure it exists
        // This is now handled in the auth.ts getCurrentUser function

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
        
        // Handle redirect errors (these are not actual errors)
        if (error && typeof error === 'object' && 'digest' in error && 
            typeof error.digest === 'string' && error.digest.includes('NEXT_REDIRECT')) {
            throw error; // Re-throw redirect errors
        }
        
        // Handle actual errors
        redirect("/workflows/new?error=" + encodeURIComponent((error as Error).message));
    }
}