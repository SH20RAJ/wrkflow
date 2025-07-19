import Link from "next/link";
import { APP_NAME } from "@/lib/constants";

export function Footer() {
    return (
        <footer className="border-t bg-background">
            <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
                <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
                    <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
                        &copy; {new Date().getFullYear()} {APP_NAME}. All rights reserved.
                    </p>
                </div>
                <div className="flex gap-4">
                    <Link
                        href="/terms"
                        className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                    >
                        Terms
                    </Link>
                    <Link
                        href="/privacy"
                        className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                    >
                        Privacy
                    </Link>
                    <Link
                        href="/contact"
                        className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                    >
                        Contact
                    </Link>
                </div>
            </div>
        </footer>
    );
}