"use client";

import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface FormSubmitButtonProps {
    children: React.ReactNode;
    className?: string;
    variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
}

export function FormSubmitButton({ children, className, variant = "default" }: FormSubmitButtonProps) {
    const { pending } = useFormStatus();

    return (
        <Button 
            type="submit" 
            disabled={pending}
            className={className}
            variant={variant}
        >
            {pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {children}
        </Button>
    );
}