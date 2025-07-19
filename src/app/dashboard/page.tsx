import { requireAuth, getCurrentUser } from "@/lib/auth";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Eye, Download, TrendingUp } from "lucide-react";
import Link from "next/link";
import { db } from "@/lib/db";
import { workflows } from "@/lib/db/schema";
import { eq, sum, count, desc } from "drizzle-orm";

export default async function DashboardPage() {
    const user = await requireAuth();
    
    // This will trigger user sync to database
    await getCurrentUser();

    // Get user's workflows and stats
    const userWorkflows = await db
        .select()
        .from(workflows)
        .where(eq(workflows.userId, user.id))
        .orderBy(desc(workflows.createdAt));

    const stats = await db
        .select({
            totalViews: sum(workflows.viewCount),
            totalDownloads: sum(workflows.downloadCount),
            workflowCount: count(workflows.id)
        })
        .from(workflows)
        .where(eq(workflows.userId, user.id));

    const { totalViews, totalDownloads, workflowCount } = stats[0] || {
        totalViews: 0,
        totalDownloads: 0,
        workflowCount: 0
    };

    return (
        <div className="container mx-auto py-8">
            <div className="mb-8 flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">Dashboard</h1>
                    <p className="text-muted-foreground">
                        Welcome back, {user.displayName || user.primaryEmail}!
                    </p>
                </div>
                <Button asChild>
                    <Link href="/workflows/new">
                        <Plus className="mr-2 h-4 w-4" />
                        Create Workflow
                    </Link>
                </Button>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">My Workflows</CardTitle>
                        <Plus className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{workflowCount}</div>
                        <p className="text-xs text-muted-foreground">
                            {workflowCount === 0 ? "No workflows published yet" : "Published workflows"}
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Views</CardTitle>
                        <Eye className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{totalViews || 0}</div>
                        <p className="text-xs text-muted-foreground">
                            Views across all workflows
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Downloads</CardTitle>
                        <Download className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{totalDownloads || 0}</div>
                        <p className="text-xs text-muted-foreground">
                            Total downloads
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Engagement</CardTitle>
                        <TrendingUp className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {workflowCount > 0 ? Math.round(((totalViews || 0) + (totalDownloads || 0)) / workflowCount) : 0}
                        </div>
                        <p className="text-xs text-muted-foreground">
                            Avg. interactions per workflow
                        </p>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Recent Workflows</CardTitle>
                    <CardDescription>
                        Your latest published workflows
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {userWorkflows.length === 0 ? (
                        <div className="text-center py-8">
                            <p className="text-muted-foreground mb-4">
                                You haven't published any workflows yet.
                            </p>
                            <Button asChild>
                                <Link href="/workflows/new">
                                    <Plus className="mr-2 h-4 w-4" />
                                    Create Your First Workflow
                                </Link>
                            </Button>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {userWorkflows.slice(0, 5).map((workflow) => (
                                <div key={workflow.id} className="flex items-center justify-between p-4 border rounded-lg">
                                    <div>
                                        <h3 className="font-medium">{workflow.title}</h3>
                                        <p className="text-sm text-muted-foreground">
                                            {workflow.description.substring(0, 100)}...
                                        </p>
                                        <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                                            <span className="flex items-center gap-1">
                                                <Eye className="h-3 w-3" />
                                                {workflow.viewCount} views
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <Download className="h-3 w-3" />
                                                {workflow.downloadCount} downloads
                                            </span>
                                            {workflow.isPaid && (
                                                <span className="text-green-600">
                                                    ${workflow.price}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                    <Button variant="outline" size="sm" asChild>
                                        <Link href={`/workflows/${workflow.id}`}>
                                            View
                                        </Link>
                                    </Button>
                                </div>
                            ))}
                            {userWorkflows.length > 5 && (
                                <div className="text-center pt-4">
                                    <Button variant="outline" asChild>
                                        <Link href="/workflows/my">View All Workflows</Link>
                                    </Button>
                                </div>
                            )}
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}