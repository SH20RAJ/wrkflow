import { MainLayout } from "@/components/layout/main-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Zap, Brain, Briefcase, Megaphone, FileText, Headphones, Layers } from "lucide-react";
import Link from "next/link";
import { db } from "@/lib/db";
import { categories, workflows } from "@/lib/db/schema";
import { eq, count } from "drizzle-orm";

import { sql } from "drizzle-orm";

// Force dynamic rendering to ensure database access happens at request time
export const dynamic = 'force-dynamic';

export default async function CategoriesPage() {
    // Get categories with workflow counts
    const categoriesWithCounts = await db.instance
        .select({
            id: categories.id,
            name: categories.name,
            description: categories.description,
            slug: categories.slug,
            icon: categories.icon,
            workflowCount: count(workflows.id),
        })
        .from(categories)
        .leftJoin(workflows, eq(categories.id, workflows.id)) // This will need to be fixed when we add category relationships
        .groupBy(categories.id);

    // Default categories if none exist in database
    const defaultCategories = [
        {
            id: "ai",
            name: "AI & Machine Learning",
            description: "Workflows powered by artificial intelligence and machine learning",
            slug: "ai",
            color: "blue",
            icon: "Brain",
            workflowCount: 0,
        },
        {
            id: "sales",
            name: "Sales & CRM",
            description: "Automate your sales processes and customer relationship management",
            slug: "sales",
            color: "green",
            icon: "Briefcase",
            workflowCount: 0,
        },
        {
            id: "marketing",
            name: "Marketing",
            description: "Marketing automation, email campaigns, and social media workflows",
            slug: "marketing",
            color: "purple",
            icon: "Megaphone",
            workflowCount: 0,
        },
        {
            id: "it-ops",
            name: "IT Operations",
            description: "DevOps, monitoring, deployment, and infrastructure automation",
            slug: "it-ops",
            color: "orange",
            icon: "Zap",
            workflowCount: 0,
        },
        {
            id: "document-ops",
            name: "Document Operations",
            description: "Document processing, data extraction, and file management",
            slug: "document-ops",
            color: "yellow",
            icon: "FileText",
            workflowCount: 0,
        },
        {
            id: "support",
            name: "Customer Support",
            description: "Help desk automation, ticket management, and customer service",
            slug: "support",
            color: "red",
            icon: "Headphones",
            workflowCount: 0,
        },
        {
            id: "other",
            name: "Other",
            description: "Miscellaneous workflows that don't fit other categories",
            slug: "other",
            color: "gray",
            icon: "Layers",
            workflowCount: 0,
        },
    ];

    const displayCategories = categoriesWithCounts.length > 0 ? categoriesWithCounts.map(cat => ({...cat, color: 'gray'})) : defaultCategories;

    const getIcon = (iconName: string) => {
        const icons = {
            Brain,
            Briefcase,
            Megaphone,
            Zap,
            FileText,
            Headphones,
            Layers,
        };
        return icons[iconName as keyof typeof icons] || Layers;
    };

    const getColorClasses = (color: string) => {
        const colors = {
            blue: "bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100",
            green: "bg-green-50 border-green-200 text-green-700 hover:bg-green-100",
            purple: "bg-purple-50 border-purple-200 text-purple-700 hover:bg-purple-100",
            orange: "bg-orange-50 border-orange-200 text-orange-700 hover:bg-orange-100",
            yellow: "bg-yellow-50 border-yellow-200 text-yellow-700 hover:bg-yellow-100",
            red: "bg-red-50 border-red-200 text-red-700 hover:bg-red-100",
            gray: "bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100",
        };
        return colors[color as keyof typeof colors] || colors.gray;
    };

    return (
        <MainLayout>
            <div className="container mx-auto py-8">
                <div className="mb-8 text-center">
                    <h1 className="text-3xl font-bold mb-2">Workflow Categories</h1>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        Explore N8N workflows organized by category. Find the perfect automation solution for your specific needs.
                    </p>
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {displayCategories.map((category) => {
                        const IconComponent = getIcon(category.icon || 'Layers');
                        return (
                            <Card 
                                key={category.id} 
                                className={`transition-all duration-200 hover:shadow-lg cursor-pointer ${getColorClasses(category.color || 'gray')}`}
                            >
                                <CardHeader>
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 rounded-lg bg-white/50">
                                            <IconComponent className="h-6 w-6" />
                                        </div>
                                        <div className="flex-1">
                                            <CardTitle className="text-lg">{category.name}</CardTitle>
                                            <Badge variant="secondary" className="mt-1">
                                                {category.workflowCount} workflows
                                            </Badge>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <CardDescription className="text-sm mb-4">
                                        {category.description}
                                    </CardDescription>
                                    <Button variant="ghost" className="w-full justify-between" asChild>
                                        <Link href={`/workflows?category=${category.slug}`}>
                                            Browse Workflows
                                            <ArrowRight className="h-4 w-4" />
                                        </Link>
                                    </Button>
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>

                <div className="mt-12 text-center">
                    <h2 className="text-2xl font-bold mb-4">Can't find what you're looking for?</h2>
                    <p className="text-muted-foreground mb-6">
                        Create your own workflow and share it with the community!
                    </p>
                    <Button size="lg" asChild>
                        <Link href="/workflows/new">Create Workflow</Link>
                    </Button>
                </div>
            </div>
        </MainLayout>
    );
}