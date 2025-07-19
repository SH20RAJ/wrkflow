import { MainLayout } from "@/components/layout/main-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowLeft, Download, Eye, Star, Share, Calendar } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { workflows, users } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

interface WorkflowPageProps {
    params: {
        id: string;
    };
}

export default async function WorkflowPage({ params }: WorkflowPageProps) {
    const workflow = await db
        .select({
            id: workflows.id,
            title: workflows.title,
            description: workflows.description,
            isPaid: workflows.isPaid,
            price: workflows.price,
            viewCount: workflows.viewCount,
            downloadCount: workflows.downloadCount,
            createdAt: workflows.createdAt,
            howItWorks: workflows.howItWorks,
            stepByStep: workflows.stepByStep,
            jsonContent: workflows.jsonContent,
            jsonUrl: workflows.jsonUrl,
            coverImage: workflows.coverImage,
            userName: users.name,
            userEmail: users.email,
            userAvatar: users.avatar,
        })
        .from(workflows)
        .leftJoin(users, eq(workflows.userId, users.id))
        .where(eq(workflows.id, params.id))
        .limit(1);

    if (!workflow.length) {
        notFound();
    }

    const workflowData = workflow[0];

    return (
        <MainLayout>
            <div className="container mx-auto py-8 max-w-6xl">
                <Button variant="ghost" asChild className="mb-6">
                    <Link href="/workflows" className="flex items-center gap-2">
                        <ArrowLeft className="h-4 w-4" />
                        Back to Workflows
                    </Link>
                </Button>

                <div className="grid gap-8 lg:grid-cols-3">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-6">
                        {workflowData.coverImage && (
                            <div className="aspect-video w-full overflow-hidden rounded-lg border">
                                <img
                                    src={workflowData.coverImage}
                                    alt={`${workflowData.title} poster`}
                                    className="h-full w-full object-cover"
                                />
                            </div>
                        )}
                        <div>
                            <h1 className="text-3xl font-bold mb-2">{workflowData.title}</h1>
                            <p className="text-lg text-muted-foreground mb-4">
                                {workflowData.description}
                            </p>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                <span className="flex items-center gap-1">
                                    <Eye className="h-4 w-4" />
                                    {workflowData.viewCount} views
                                </span>
                                <span className="flex items-center gap-1">
                                    <Download className="h-4 w-4" />
                                    {workflowData.downloadCount} downloads
                                </span>
                                <span className="flex items-center gap-1">
                                    <Calendar className="h-4 w-4" />
                                    {new Date(workflowData.createdAt).toLocaleDateString()}
                                </span>
                            </div>
                        </div>

                        {workflowData.howItWorks && (
                            <Card>
                                <CardHeader>
                                    <CardTitle>How It Works</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="prose prose-sm max-w-none">
                                        {workflowData.howItWorks}
                                    </div>
                                </CardContent>
                            </Card>
                        )}

                        {workflowData.stepByStep && (
                            <Card>
                                <CardHeader>
                                    <CardTitle>Step-by-Step Guide</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="prose prose-sm max-w-none">
                                        {workflowData.stepByStep}
                                    </div>
                                </CardContent>
                            </Card>
                        )}

                        <Card>
                            <CardHeader>
                                <CardTitle>Workflow JSON</CardTitle>
                                <CardDescription>
                                    Copy this JSON and import it into your N8N instance
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
                                    <code>
                                        {workflowData.jsonContent || "JSON content not available"}
                                    </code>
                                </pre>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        <Card>
                            <CardContent className="pt-6">
                                <div className="space-y-4">
                                    {workflowData.isPaid ? (
                                        <div className="text-center">
                                            <div className="text-3xl font-bold text-green-600 mb-2">
                                                ${workflowData.price}
                                            </div>
                                            <Button className="w-full" size="lg">
                                                Purchase Workflow
                                            </Button>
                                        </div>
                                    ) : (
                                        <Button className="w-full" size="lg">
                                            <Download className="mr-2 h-4 w-4" />
                                            Download Free
                                        </Button>
                                    )}
                                    
                                    <div className="flex gap-2">
                                        <Button variant="outline" size="sm" className="flex-1">
                                            <Star className="mr-2 h-4 w-4" />
                                            Save
                                        </Button>
                                        <Button variant="outline" size="sm" className="flex-1">
                                            <Share className="mr-2 h-4 w-4" />
                                            Share
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Creator</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-center gap-3">
                                    <Avatar>
                                        <AvatarImage src={workflowData.userAvatar || ""} />
                                        <AvatarFallback>
                                            {(workflowData.userName || workflowData.userEmail)?.charAt(0)?.toUpperCase()}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <p className="font-medium">
                                            {workflowData.userName || workflowData.userEmail}
                                        </p>
                                        <p className="text-sm text-muted-foreground">
                                            Workflow Creator
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Stats</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Views</span>
                                    <span className="font-medium">{workflowData.viewCount}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Downloads</span>
                                    <span className="font-medium">{workflowData.downloadCount}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Created</span>
                                    <span className="font-medium">
                                        {new Date(workflowData.createdAt).toLocaleDateString()}
                                    </span>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}