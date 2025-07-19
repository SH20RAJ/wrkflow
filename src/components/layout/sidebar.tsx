"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
    LayoutDashboard,
    FileText,
    Settings,
    BarChart3,
    CreditCard,
    Users,
    LogOut,
} from "lucide-react";

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
    items: {
        href: string;
        title: string;
        icon: React.ReactNode;
    }[];
}

export function Sidebar({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
    const pathname = usePathname();

    const routes = [
        {
            href: "/dashboard",
            title: "Dashboard",
            icon: <LayoutDashboard className="mr-2 h-4 w-4" />,
        },
        {
            href: "/dashboard/workflows",
            title: "My Workflows",
            icon: <FileText className="mr-2 h-4 w-4" />,
        },
        {
            href: "/dashboard/analytics",
            title: "Analytics",
            icon: <BarChart3 className="mr-2 h-4 w-4" />,
        },
        {
            href: "/dashboard/sales",
            title: "Sales",
            icon: <CreditCard className="mr-2 h-4 w-4" />,
        },
        {
            href: "/dashboard/customers",
            title: "Customers",
            icon: <Users className="mr-2 h-4 w-4" />,
        },
        {
            href: "/dashboard/settings",
            title: "Settings",
            icon: <Settings className="mr-2 h-4 w-4" />,
        },
    ];

    return (
        <nav
            className={cn(
                "flex flex-col space-y-1 py-4",
                className
            )}
            {...props}
        >
            <div className="px-3 py-2">
                <h2 className="mb-2 px-4 text-lg font-semibold">Dashboard</h2>
                <div className="space-y-1">
                    {routes.map((route) => (
                        <Button
                            key={route.href}
                            variant={pathname === route.href ? "secondary" : "ghost"}
                            className={cn(
                                "w-full justify-start",
                                pathname === route.href
                                    ? "bg-secondary text-secondary-foreground"
                                    : "text-muted-foreground hover:text-foreground"
                            )}
                            asChild
                        >
                            <Link href={route.href}>
                                {route.icon}
                                {route.title}
                            </Link>
                        </Button>
                    ))}
                </div>
            </div>
            <div className="px-3 py-2">
                <div className="space-y-1">
                    <Button
                        variant="ghost"
                        className="w-full justify-start text-muted-foreground hover:text-foreground"
                        asChild
                    >
                        <Link href="/auth/logout">
                            <LogOut className="mr-2 h-4 w-4" />
                            Logout
                        </Link>
                    </Button>
                </div>
            </div>
        </nav>
    );
}