"use client";

import { useUser } from "@stackframe/stack";
import { stackApp } from "@/lib/stack-client";

export function useAuth() {
    const user = useUser();

    return {
        user,
        isAuthenticated: !!user,
        isLoading: user === undefined,
        signIn: () => stackApp.redirectToSignIn(),
        signUp: () => stackApp.redirectToSignUp(),
        signOut: () => stackApp.signOut(),
    };
}