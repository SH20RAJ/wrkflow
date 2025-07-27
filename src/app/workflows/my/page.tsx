import { requireAuth, getCurrentUser } from "@/lib/auth";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Eye, Download, Edit, Trash2 } from "lucide-react";
import Link from "next/link";
import { getDB } from "@/lib/db";
import { workflows } from "@/lib/db/schema";
import { eq, desc } from "drizzle-orm";
import { MainLayout } from "@/components/layout/main-layout";
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: "My Workflows | Wrkflow",
    description: "Manage and edit your published N8N workflows",
};

// Force dynamic rendering to ensure database access happens at request time
export const dynamic = 'force-dynamic';

export default async function MyWorkflowsPage() {
    const user = await requireAuth();

    // This will trigger user sync to database
    await getCurrentUser();

    const db = getDB();
    // Get user's workflows
    const userWorkflows = await db
        .select()
        .from(workflows)
        .where(eq(workflows.userId, user.id))
        .orderBy(desc(workflows.createdAt));

    return (
        <MainLayout>
            <div className="container mx-auto py-8">
                <div className="mb-8 flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold">My Workflows</h1>
                        <p className="text-muted-foreground">
                            Manage and edit your published workflows
                        </p>
                    </div>
                    <Button asChild>
                        <Link href="/workflows/new">
                            <Plus className="mr-2 h-4 w-4" />
                            Create Workflow
                        </Link>
                    </Button>
                </div>

                {userWorkflows.length === 0 ? (
                    <Card>
                        <CardContent className="text-center py-12">
                            <p className="text-muted-foreground mb-4">
                                You haven't published any workflows yet.
                            </p>
                            <Button asChild>
                                <Link href="/workflows/new">
                                    <Plus className="mr-2 h-4 w-4" />
                                    Create Your First Workflow
                                </Link>
                            </Button>
                        </CardContent>
                    </Card>
                ) : (
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {userWorkflows.map((workflow) => (
                            <Card key={workflow.id} className="overflow-hidden">
                                {workflow.coverImage && (
                                    <div className="aspect-video w-full overflow-hidden">
                                        <img
                                            src={workflow.coverImage}
                                            alt={`${workflow.title} poster`}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                )}
                                <CardHeader>
                                    <CardTitle className="line-clamp-2">{workflow.title}</CardTitle>
                                    <CardDescription className="line-clamp-3">
                                        {workflow.description}
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex items-center gap-4 mb-4 text-sm text-muted-foreground">
                                        <span className="flex items-center gap-1">
                                            <Eye className="h-3 w-3" />
                                            {workflow.viewCount} views
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <Download className="h-3 w-3" />
                                            {workflow.downloadCount} downloads
                                        </span>
                                        {workflow.isPaid && (
                                            <span className="text-green-600 font-medium">
                                                ${workflow.price}
                                            </span>
                                        )}
                                    </div>
                                    <div className="flex gap-2">
                                        <Button variant="outline" size="sm" asChild className="flex-1">
                                            <Link href={`/workflows/${workflow.id}`}>
                                                View
                                            </Link>
                                        </Button>
                                        <Button variant="outline" size="sm" asChild className="flex-1">
                                            <Link href={`/workflows/${workflow.id}/edit`}>
                                                <Edit className="mr-1 h-3 w-3" />
                                                Edit
                                            </Link>
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </MainLayout>
    );
}