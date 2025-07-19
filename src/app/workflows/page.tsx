import { MainLayout } from "@/components/layout/main-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye, Download, Star } from "lucide-react";
import Link from "next/link";

export default function WorkflowsPage() {
    // This will be replaced with real data from the database
    const workflows = [];

    return (
        <MainLayout>
            <div className="container mx-auto py-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold">Browse Workflows</h1>
                    <p className="text-muted-foreground">
                        Discover amazing N8N workflows created by the community
                    </p>
                </div>

                {workflows.length === 0 ? (
                    <div className="text-center py-16">
                        <h2 className="text-2xl font-semibold mb-4">No workflows yet</h2>
                        <p className="text-muted-foreground mb-8">
                            Be the first to share your N8N workflow with the community!
                        </p>
                        <Button asChild>
                            <Link href="/handler/sign-up">
                                Create Account & Share Workflow
                            </Link>
                        </Button>
                    </div>
                ) : (
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {workflows.map((workflow: any) => (
                            <Card key={workflow.id} className="hover:shadow-lg transition-shadow">
                                <CardHeader>
                                    <div className="flex items-start justify-between">
                                        <div className="space-y-1">
                                            <CardTitle className="line-clamp-2">{workflow.title}</CardTitle>
                                            <CardDescription className="line-clamp-2">
                                                {workflow.description}
                                            </CardDescription>
                                        </div>
                                        {workflow.isPaid && (
                                            <Badge variant="secondary">${workflow.price}</Badge>
                                        )}
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                                        <div className="flex items-center gap-4">
                                            <span className="flex items-center gap-1">
                                                <Eye className="h-3 w-3" />
                                                {workflow.viewCount}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <Download className="h-3 w-3" />
                                                {workflow.downloadCount}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <Star className="h-3 w-3" />
                                                5.0
                                            </span>
                                        </div>
                                        <Button size="sm" asChild>
                                            <Link href={`/workflows/${workflow.id}`}>
                                                View
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