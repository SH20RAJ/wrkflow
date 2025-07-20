import { requireAuth, getCurrentUser } from "@/lib/auth";
import { MainLayout } from "@/components/layout/main-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Settings, Eye, Download, Star, Lock, Globe } from "lucide-react";
import Link from "next/link";
import { db } from "@/lib/db";
import { workflows, savedWorkflows, collections, users } from "@/lib/db/schema";
import { eq, desc } from "drizzle-orm";

// Force dynamic rendering to ensure database access happens at request time  
export const dynamic = 'force-dynamic';

export default async function ProfilePage() {
    const user = await requireAuth();
    await getCurrentUser();

    // Get user's workflows
    const userWorkflows = await db.instance
        .select()
        .from(workflows)
        .where(eq(workflows.userId, user.id))
        .orderBy(desc(workflows.createdAt));

    // Get user's saved workflows
    const userSavedWorkflows = await db.instance
        .select({
            id: savedWorkflows.id,
            savedAt: savedWorkflows.savedAt,
            workflowId: workflows.id,
            title: workflows.title,
            description: workflows.description,
            coverImage: workflows.coverImage,
            isPaid: workflows.isPaid,
            price: workflows.price,
            viewCount: workflows.viewCount,
            downloadCount: workflows.downloadCount,
            authorName: users.name,
            authorEmail: users.email,
        })
        .from(savedWorkflows)
        .leftJoin(workflows, eq(savedWorkflows.workflowId, workflows.id))
        .leftJoin(users, eq(workflows.userId, users.id))
        .where(eq(savedWorkflows.userId, user.id))
        .orderBy(desc(savedWorkflows.savedAt));

    // Get user's collections
    const userCollections = await db.instance
        .select()
        .from(collections)
        .where(eq(collections.userId, user.id))
        .orderBy(desc(collections.createdAt));

    const publicWorkflows = userWorkflows.filter(w => !w.isPrivate);
    const privateWorkflows = userWorkflows.filter(w => w.isPrivate);

    return (
        <MainLayout>
            <div className="container mx-auto py-8 max-w-6xl">
                {/* Profile Header */}
                <div className="mb-8">
                    <div className="flex items-center gap-6 mb-6">
                        <Avatar className="h-24 w-24">
                            <AvatarImage src={user.profilePictureUrl || ''} />
                            <AvatarFallback className="text-2xl">
                                {(user.displayName || user.primaryEmail || 'U').charAt(0).toUpperCase()}
                            </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                            <h1 className="text-3xl font-bold mb-2">
                                {user.displayName || user.primaryEmail}
                            </h1>
                            <p className="text-muted-foreground mb-4">
                                {user.primaryEmail}
                            </p>
                            <div className="flex gap-4 text-sm text-muted-foreground">
                                <span>{userWorkflows.length} workflows</span>
                                <span>{userSavedWorkflows.length} saved</span>
                                <span>{userCollections.length} collections</span>
                            </div>
                        </div>
                        <Button variant="outline" asChild>
                            <Link href="/profile/settings">
                                <Settings className="h-4 w-4 mr-2" />
                                Settings
                            </Link>
                        </Button>
                    </div>
                </div>

                <Tabs defaultValue="workflows" className="space-y-6">
                    <TabsList className="grid w-full grid-cols-4">
                        <TabsTrigger value="workflows">My Workflows</TabsTrigger>
                        <TabsTrigger value="saved">Saved</TabsTrigger>
                        <TabsTrigger value="collections">Collections</TabsTrigger>
                        <TabsTrigger value="private">Private</TabsTrigger>
                    </TabsList>

                    <TabsContent value="workflows" className="space-y-6">
                        <div className="flex items-center justify-between">
                            <h2 className="text-2xl font-bold">Public Workflows</h2>
                            <Button asChild>
                                <Link href="/workflows/new">Create New</Link>
                            </Button>
                        </div>
                        
                        {publicWorkflows.length === 0 ? (
                            <Card>
                                <CardContent className="text-center py-8">
                                    <p className="text-muted-foreground mb-4">No public workflows yet</p>
                                    <Button asChild>
                                        <Link href="/workflows/new">Create Your First Workflow</Link>
                                    </Button>
                                </CardContent>
                            </Card>
                        ) : (
                            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                                {publicWorkflows.map((workflow) => (
                                    <Card key={workflow.id} className="hover:shadow-lg transition-shadow overflow-hidden">
                                        {workflow.coverImage && (
                                            <div className="aspect-video w-full overflow-hidden">
                                                <img
                                                    src={workflow.coverImage}
                                                    alt={`${workflow.title} poster`}
                                                    className="h-full w-full object-cover"
                                                />
                                            </div>
                                        )}
                                        <CardHeader>
                                            <div className="flex items-start justify-between">
                                                <CardTitle className="line-clamp-1">{workflow.title}</CardTitle>
                                                <Globe className="h-4 w-4 text-green-600" />
                                            </div>
                                            <CardDescription className="line-clamp-2">
                                                {workflow.description}
                                            </CardDescription>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                                                <div className="flex items-center gap-3">
                                                    <span className="flex items-center gap-1">
                                                        <Eye className="h-3 w-3" />
                                                        {workflow.viewCount}
                                                    </span>
                                                    <span className="flex items-center gap-1">
                                                        <Download className="h-3 w-3" />
                                                        {workflow.downloadCount}
                                                    </span>
                                                </div>
                                                {workflow.isPaid && (
                                                    <Badge variant="secondary">${workflow.price}</Badge>
                                                )}
                                            </div>
                                            <Button asChild className="w-full">
                                                <Link href={`/workflows/${workflow.id}`}>View Details</Link>
                                            </Button>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        )}
                    </TabsContent>

                    <TabsContent value="saved" className="space-y-6">
                        <h2 className="text-2xl font-bold">Saved Workflows</h2>
                        
                        {userSavedWorkflows.length === 0 ? (
                            <Card>
                                <CardContent className="text-center py-8">
                                    <p className="text-muted-foreground mb-4">No saved workflows yet</p>
                                    <Button asChild>
                                        <Link href="/workflows">Browse Workflows</Link>
                                    </Button>
                                </CardContent>
                            </Card>
                        ) : (
                            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                                {userSavedWorkflows.map((saved) => (
                                    <Card key={saved.id} className="hover:shadow-lg transition-shadow overflow-hidden">
                                        {saved.coverImage && (
                                            <div className="aspect-video w-full overflow-hidden">
                                                <img
                                                    src={saved.coverImage}
                                                    alt={`${saved.title} poster`}
                                                    className="h-full w-full object-cover"
                                                />
                                            </div>
                                        )}
                                        <CardHeader>
                                            <CardTitle className="line-clamp-1">{saved.title}</CardTitle>
                                            <CardDescription className="line-clamp-2">
                                                {saved.description}
                                            </CardDescription>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                                                <span>By {saved.authorName || saved.authorEmail}</span>
                                                <div className="flex items-center gap-3">
                                                    <span className="flex items-center gap-1">
                                                        <Eye className="h-3 w-3" />
                                                        {saved.viewCount}
                                                    </span>
                                                    <span className="flex items-center gap-1">
                                                        <Download className="h-3 w-3" />
                                                        {saved.downloadCount}
                                                    </span>
                                                </div>
                                            </div>
                                            <Button asChild className="w-full">
                                                <Link href={`/workflows/${saved.workflowId}`}>View Details</Link>
                                            </Button>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        )}
                    </TabsContent>

                    <TabsContent value="collections" className="space-y-6">
                        <div className="flex items-center justify-between">
                            <h2 className="text-2xl font-bold">Collections</h2>
                            <Button asChild>
                                <Link href="/collections/new">Create Collection</Link>
                            </Button>
                        </div>
                        
                        {userCollections.length === 0 ? (
                            <Card>
                                <CardContent className="text-center py-8">
                                    <p className="text-muted-foreground mb-4">No collections yet</p>
                                    <Button asChild>
                                        <Link href="/collections/new">Create Your First Collection</Link>
                                    </Button>
                                </CardContent>
                            </Card>
                        ) : (
                            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                                {userCollections.map((collection) => (
                                    <Card key={collection.id} className="hover:shadow-lg transition-shadow">
                                        <CardHeader>
                                            <div className="flex items-start justify-between">
                                                <CardTitle className="line-clamp-1">{collection.name}</CardTitle>
                                                {collection.isPrivate ? (
                                                    <Lock className="h-4 w-4 text-orange-600" />
                                                ) : (
                                                    <Globe className="h-4 w-4 text-green-600" />
                                                )}
                                            </div>
                                            <CardDescription className="line-clamp-2">
                                                {collection.description || 'No description'}
                                            </CardDescription>
                                        </CardHeader>
                                        <CardContent>
                                            <Button asChild className="w-full">
                                                <Link href={`/collections/${collection.id}`}>View Collection</Link>
                                            </Button>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        )}
                    </TabsContent>

                    <TabsContent value="private" className="space-y-6">
                        <h2 className="text-2xl font-bold">Private Workflows</h2>
                        
                        {privateWorkflows.length === 0 ? (
                            <Card>
                                <CardContent className="text-center py-8">
                                    <p className="text-muted-foreground">No private workflows</p>
                                </CardContent>
                            </Card>
                        ) : (
                            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                                {privateWorkflows.map((workflow) => (
                                    <Card key={workflow.id} className="hover:shadow-lg transition-shadow overflow-hidden">
                                        {workflow.coverImage && (
                                            <div className="aspect-video w-full overflow-hidden">
                                                <img
                                                    src={workflow.coverImage}
                                                    alt={`${workflow.title} poster`}
                                                    className="h-full w-full object-cover"
                                                />
                                            </div>
                                        )}
                                        <CardHeader>
                                            <div className="flex items-start justify-between">
                                                <CardTitle className="line-clamp-1">{workflow.title}</CardTitle>
                                                <Lock className="h-4 w-4 text-orange-600" />
                                            </div>
                                            <CardDescription className="line-clamp-2">
                                                {workflow.description}
                                            </CardDescription>
                                        </CardHeader>
                                        <CardContent>
                                            <Button asChild className="w-full">
                                                <Link href={`/workflows/${workflow.id}`}>View Details</Link>
                                            </Button>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        )}
                    </TabsContent>
                </Tabs>
            </div>
        </MainLayout>
    );
}