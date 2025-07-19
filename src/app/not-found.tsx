import Link from "next/link";
import { MainLayout } from "@/components/layout/main-layout";
import { Button } from "@/components/ui/button";

export default function NotFound() {
    return (
        <MainLayout>
            <div className="container flex h-[50vh] flex-col items-center justify-center space-y-4">
                <div className="space-y-2 text-center">
                    <h1 className="text-4xl font-bold">404</h1>
                    <h2 className="text-xl font-semibold">Page Not Found</h2>
                    <p className="text-muted-foreground">
                        The page you are looking for doesn't exist or has been moved.
                    </p>
                </div>
                <Button asChild>
                    <Link href="/">Go Home</Link>
                </Button>
            </div>
        </MainLayout>
    );
}