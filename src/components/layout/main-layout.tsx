import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

interface MainLayoutProps {
    children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
    return (
        <div className="flex min-h-screen flex-col justify-center items-center mx-auto w-full">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
        </div>
    );
}