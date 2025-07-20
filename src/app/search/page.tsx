import { MainLayout } from "@/components/layout/main-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, Eye, Download, Star } from "lucide-react";
import Link from "next/link";
import { db } from "@/lib/db";
import { workflows, users } from "@/lib/db/schema";
import { eq, like, or, and } from "drizzle-orm";

// Force dynamic rendering to ensure database access happens at request time
export const dynamic = 'force-dynamic';

interface SearchPageProps {
    searchParams: Promise<{
        q?: string;
        category?: string;
        tags?: string;
    }>;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
    const { q, category, tags } = await searchParams;
    const query = q || '';
    const categoryFilter = category || '';
    const tagsFilter = tags || '';

    // Build search conditions
    const whereConditions = [];
    
    if (query) {
        whereConditions.push(
            or(
                like(workflows.title, `%${query}%`),
                like(workflows.description, `%${query}%`),
                like(workflows.tags, `%${query}%`)
            )
        );
    }
    
    if (categoryFilter) {
        whereConditions.push(eq(workflows.categoryId, categoryFilter));
    }
    
    // Only show public workflows in search
    whereConditions.push(eq(workflows.isPrivate, false));

    const searchResults = await db.instance
        .select({
            id: workflows.id,
            title: workflows.title,
            description: workflows.description,
            isPaid: workflows.isPaid,
            price: workflows.price,
            viewCount: workflows.viewCount,
            downloadCount: workflows.downloadCount,
            createdAt: workflows.createdAt,
            coverImage: workflows.coverImage,
            tags: workflows.tags,
            categoryId: workflows.categoryId,
            userName: users.name,
            userEmail: users.email,
        })
        .from(workflows)
        .leftJoin(users, eq(workflows.userId, users.id))
        .where(whereConditions.length > 0 ? and(...whereConditions) : undefined)
        .orderBy(workflows.createdAt);

    return (
        <MainLayout>
            <div className="container mx-auto py-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold mb-2">Search Workflows</h1>
                    <p className="text-muted-foreground">
                        Find workflows by name, description, or tags
                    </p>
                </div>

                {/* Search Form */}
                <form method="GET" className="mb-8">
                    <div className="flex flex-col sm:flex-row gap-4">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                            <Input
                                name="q"
                                defaultValue={query}
                                placeholder="Search workflows..."
                                className="pl-10"
                            />
                        </div>
                        <Input
                            name="category"
                            defaultValue={categoryFilter}
                            placeholder="Category"
                            className="sm:w-48"
                        />
                        <Input
                            name="tags"
                            defaultValue={tagsFilter}
                            placeholder="Tags"
                            className="sm:w-48"
                        />
                        <Button type="submit">Search</Button>
                    </div>
                </form>

                {/* Search Results */}
                <div className="mb-4">
                    <p className="text-muted-foreground">
                        {searchResults.length} workflow{searchResults.length !== 1 ? 's' : ''} found
                        {query && ` for "${query}"`}
                    </p>
                </div>

                {searchResults.length === 0 ? (
                    <div className="text-center py-12">
                        <h3 className="text-lg font-semibold mb-2">No workflows found</h3>
                        <p className="text-muted-foreground mb-4">
                            Try adjusting your search terms or browse all workflows
                        </p>
                        <Button asChild>
                            <Link href="/workflows">Browse All Workflows</Link>
                        </Button>
                    </div>
                ) : (
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {searchResults.map((workflow) => (
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
                                        <div className="flex-1">
                                            <CardTitle className="line-clamp-1">{workflow.title}</CardTitle>
                                            <CardDescription className="line-clamp-2 mt-1">
                                                {workflow.description}
                                            </CardDescription>
                                        </div>
                                        {workflow.isPaid && (
                                            <Badge variant="secondary" className="ml-2">
                                                ${workflow.price}
                                            </Badge>
                                        )}
                                    </div>
                                    {workflow.tags && (
                                        <div className="flex flex-wrap gap-1 mt-2">
                                            {JSON.parse(workflow.tags).slice(0, 3).map((tag: string) => (
                                                <Badge key={tag} variant="outline" className="text-xs">
                                                    {tag}
                                                </Badge>
                                            ))}
                                        </div>
                                    )}
                                </CardHeader>
                                <CardContent>
                                    <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                                        <span>By {workflow.userName || workflow.userEmail}</span>
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
                                    </div>
                                    <div className="flex gap-2">
                                        <Button asChild className="flex-1">
                                            <Link href={`/workflows/${workflow.id}`}>
                                                View Details
                                            </Link>
                                        </Button>
                                        <Button variant="outline" size="icon">
                                            <Star className="h-4 w-4" />
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