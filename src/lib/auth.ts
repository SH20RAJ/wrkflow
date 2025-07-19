import { stackServerApp } from "@/stack";
import { redirect } from "next/navigation";

/**
 * Get the current user on the server side
 * Returns null if no user is authenticated
 */
export async function getCurrentUser() {
    try {
        const user = await stackServerApp.getUser();
        return user;
    } catch (error) {
        return null;
    }
}

/**
 * Require authentication on the server side
 * Redirects to sign-in page if user is not authenticated
 */
export async function requireAuth() {
    const user = await getCurrentUser();

    if (!user) {
        redirect("/handler/sign-in");
    }

    return user;
}

/**
 * Check if user is authenticated on the server side
 */
export async function isAuthenticated() {
    const user = await getCurrentUser();
    return !!user;
}