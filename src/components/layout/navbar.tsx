import Link from "next/link";
import { Button } from "@/components/ui/button";
import { APP_NAME } from "@/lib/constants";
import { ModeToggle } from "@/components/layout/mode-toggle";
import { AuthButton } from "@/components/auth/auth-button";

export function Navbar() {

    return (
        <header className="sticky top-0 z-40 w-full border-b bg-background  flex items-center justify-center px-4 py-2 shadow-sm">
            <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
                <div className="flex gap-6 md:gap-10">
                    <Link href="/" className="flex items-center space-x-2">
                        <span className="inline-block font-bold">{APP_NAME}</span>
                    </Link>
                    <nav className="hidden gap-6 md:flex">
                        <Link
                            href="/workflows"
                            className="flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                        >
                            Workflows
                        </Link>
                        <Link
                            href="/categories"
                            className="flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                        >
                            Categories
                        </Link>
                        <Link
                            href="/about"
                            className="flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                        >
                            About
                        </Link>
                    </nav>
                </div>
                <div className="flex flex-1 items-center justify-end space-x-4">
                    <nav className="flex items-center space-x-2">
                        <ModeToggle />
                        <AuthButton />
                    </nav>
                </div>
            </div>
        </header>
    );
}