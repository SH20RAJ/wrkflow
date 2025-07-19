"use server";

import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";

export async function ensureUserSync() {
    const user = await getCurrentUser();
    if (!user) {
        redirect("/handler/sign-in");
    }
    return user;
}