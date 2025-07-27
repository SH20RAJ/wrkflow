import { MainLayout } from "@/components/layout/main-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowLeft, Eye, Calendar, Download } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getDB } from "@/lib/db";
import { workflows, users, ratings } from "@/lib/db/schema";
import { tags, workflowsToTags } from "@/lib/db/schema/tags";
import { eq, avg, count } from "drizzle-orm";
import ReactMarkdown from "react-markdown";
import { getCurrentUser } from "@/lib/auth";
import { WorkflowActions } from "@/components/workflow-actions";
import { WorkflowViewTracker } from "@/components/workflow-view-tracker";
import { JsonCopyButton } from "@/components/json-copy-button";
import { WorkflowRatingsServer } from "@/components/workflow-ratings-server";
import { WorkflowCommentsServer } from "@/components/workflow-comments-server";
import { RatingDisplay } from "@/components/rating-display";

// Force dynamic rendering to ensure database access happens at request time
export const dynamic = 'force-dynamic';

interface WorkflowTag {
    id: string;
    name: string;
}

interface RatingStats {
    averageRating: number;
    totalRatings: number;
}

interface WorkflowData {
    id: string;
    title: string;
    slug: string;
    description: string;
    isPaid: boolean;
    price: number | null;
    viewCount: number;
    downloadCount: number;
    createdAt: Date | null;
    howItWorks: string | null;
    stepByStep: string | null;
    jsonContent: string | null;
    jsonUrl: string | null;
    coverImage: string | null;
    userId: string;
    userName: string | null;
    userEmail: string | null;
    userAvatar: string | null;
    workflowTags: WorkflowTag[];
    ratingStats: RatingStats;
}

interface WorkflowPageProps {
    params: Promise<{
        slug: string;
    }>;
}

export default async function WorkflowPage({ params }: WorkflowPageProps) {
    const { slug } = await params;

    // Get current user to check if they can edit
    const currentUser = await getCurrentUser();

    const db = getDB();

    // Fetch main workflow data by slug
    const workflow = await db
        .select({
            id: workflows.id,
            title: workflows.title,
            slug: workflows.slug,
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
            userId: workflows.userId,
            userName: users.name,
            userEmail: users.email,
            userAvatar: users.avatar,
        })
        .from(workflows)
        .leftJoin(users, eq(workflows.userId, users.id))
        .where(eq(workflows.slug, slug))
        .limit(1);

    if (!workflow.length) {
        notFound();
    }

    const baseWorkflowData = workflow[0];

    // Fetch tags for this workflow
    const workflowTags = await db
        .select({
            id: tags.id,
            name: tags.name,
        })
        .from(tags)
        .innerJoin(workflowsToTags, eq(tags.id, workflowsToTags.tagId))
        .where(eq(workflowsToTags.workflowId, baseWorkflowData.id));

    // Fetch rating statistics
    const [ratingStats] = await db
        .select({
            averageRating: avg(ratings.rating),
            totalRatings: count(ratings.id),
        })
        .from(ratings)
        .where(eq(ratings.workflowId, baseWorkflowData.id));

    // Combine all data
    const workflowData: WorkflowData = {
        ...baseWorkflowData,
        workflowTags: workflowTags,
        ratingStats: {
            averageRating: ratingStats.averageRating ? Number(ratingStats.averageRating) : 0,
            totalRatings: ratingStats.totalRatings || 0,
        }
    };

    const canEdit = currentUser ? currentUser.id === workflowData.userId : false;

    return (
        <MainLayout>
            <WorkflowViewTracker workflowId={workflowData.id} />
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
                            <div className="text-lg text-muted-foreground mb-4 prose prose-lg max-w-none">
                                <ReactMarkdown>{workflowData.description}</ReactMarkdown>
                            </div>

                            {/* Tags */}
                            {workflowData.workflowTags && workflowData.workflowTags.length > 0 && (
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {workflowData.workflowTags.map((tag) => (
                                        <Badge key={tag.id} variant="secondary">
                                            {tag.name}
                                        </Badge>
                                    ))}
                                </div>
                            )}

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
                                    {workflowData.createdAt ? new Date(workflowData.createdAt).toLocaleDateString() : 'Unknown date'}
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
                                        <ReactMarkdown>{workflowData.howItWorks}</ReactMarkdown>
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
                                        <ReactMarkdown>{workflowData.stepByStep}</ReactMarkdown>
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
                                <div className="relative">
                                    <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
                                        <code>
                                            {workflowData.jsonContent || "JSON content not available"}
                                        </code>
                                    </pre>
                                    {workflowData.jsonContent && (
                                        <JsonCopyButton jsonContent={workflowData.jsonContent} />
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        <Card>
                            <CardContent className="pt-6">
                                <WorkflowActions
                                    workflowId={workflowData.id}
                                    isPaid={workflowData.isPaid}
                                    price={workflowData.price}
                                    canEdit={canEdit}
                                    jsonContent={workflowData.jsonContent}
                                    title={workflowData.title}
                                />
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
                                {workflowData.ratingStats && workflowData.ratingStats.totalRatings > 0 && (
                                    <div className="flex justify-between items-center">
                                        <span className="text-muted-foreground">Rating</span>
                                        <div className="flex items-center gap-1">
                                            <RatingDisplay
                                                rating={workflowData.ratingStats.averageRating}
                                                size="sm"
                                                showValue={false}
                                            />
                                            <span className="font-medium text-sm">
                                                {workflowData.ratingStats.averageRating.toFixed(1)}
                                            </span>
                                            <span className="text-xs text-muted-foreground">
                                                ({workflowData.ratingStats.totalRatings})
                                            </span>
                                        </div>
                                    </div>
                                )}
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Created</span>
                                    <span className="font-medium">
                                        {workflowData.createdAt ? new Date(workflowData.createdAt).toLocaleDateString() : 'Unknown date'}
                                    </span>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>

                {/* Ratings and Reviews Section */}
                <div className="mt-12">
                    <WorkflowRatingsServer
                        workflowId={workflowData.id}
                        currentUserId={currentUser?.id}
                    />
                </div>

                {/* Comments Section */}
                <div className="mt-8">
                    <WorkflowCommentsServer
                        workflowId={workflowData.id}
                        currentUserId={currentUser?.id}
                    />
                </div>
            </div>
        </MainLayout>
    );
}