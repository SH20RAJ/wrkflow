import { MainLayout } from "@/components/layout/main-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Search, 
  Filter, 
  Eye, 
  Download, 
  Star, 
  TrendingUp, 
  Clock, 
  DollarSign,
  Grid3X3,
  List,
  SlidersHorizontal,
  ArrowUpDown
} from "lucide-react";
import Link from "next/link";
import { db } from "@/lib/db";
import { workflows, users } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import type { Metadata } from "next";

// Force dynamic rendering to ensure database access happens at request time
export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: "N8N Workflows Marketplace | Browse Automation Workflows",
  description: "Discover thousands of professional N8N workflows. Download, customize, and deploy automation solutions for your business. Free and premium workflows available.",
  keywords: ["n8n workflows", "automation", "workflow marketplace", "business automation", "n8n templates"],
  openGraph: {
    title: "N8N Workflows Marketplace | Browse Automation Workflows",
    description: "Discover thousands of professional N8N workflows. Download, customize, and deploy automation solutions for your business.",
    type: "website",
  },
};

export default async function WorkflowsPage() {
    // Get all workflows with user info
    const allWorkflows = await db.instance
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
            posterImage: workflows.posterImage,
            tags: workflows.tags,
            categoryId: workflows.categoryId,
            userName: users.name,
            userEmail: users.email,
        })
        .from(workflows)
        .leftJoin(users, eq(workflows.userId, users.id))
        .orderBy(workflows.createdAt);

    const categories = [
        { id: "automation", name: "Automation", count: 45 },
        { id: "integration", name: "Integration", count: 32 },
        { id: "data-processing", name: "Data Processing", count: 28 },
        { id: "marketing", name: "Marketing", count: 24 },
        { id: "productivity", name: "Productivity", count: 19 },
        { id: "e-commerce", name: "E-commerce", count: 15 },
    ];

    const featuredWorkflows = allWorkflows.slice(0, 3);
    const trendingWorkflows = allWorkflows.sort((a, b) => b.viewCount - a.viewCount).slice(0, 6);

    return (
        <MainLayout>
            <div className="container mx-auto px-4 py-8">
                {/* Header Section */}
                <div className="mb-12 text-center">
                    <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-4">
                        Discover Amazing 
                        <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                            {" "}N8N Workflows
                        </span>
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        Browse thousands of professional automation workflows. From simple integrations to complex business processes.
                    </p>
                    
                    {/* Quick Stats */}
                    <div className="flex justify-center gap-8 mt-8 text-sm">
                        <div className="text-center">
                            <div className="text-2xl font-bold text-primary">{allWorkflows.length}</div>
                            <div className="text-muted-foreground">Total Workflows</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl font-bold text-primary">
                                {allWorkflows.reduce((sum, w) => sum + w.downloadCount, 0)}
                            </div>
                            <div className="text-muted-foreground">Downloads</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl font-bold text-primary">
                                {allWorkflows.filter(w => !w.isPaid).length}
                            </div>
                            <div className="text-muted-foreground">Free Workflows</div>
                        </div>
                    </div>
                </div>

                {/* Search and Filter Section */}
                <Card className="mb-8">
                    <CardContent className="p-6">
                        <div className="flex flex-col lg:flex-row gap-4">
                            {/* Search */}
                            <div className="relative flex-1">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                                <Input
                                    placeholder="Search workflows by name, description, or tags..."
                                    className="pl-10 h-12"
                                />
                            </div>
                            
                            {/* Filters */}
                            <div className="flex gap-3">
                                <Select>
                                    <SelectTrigger className="w-40 h-12">
                                        <SelectValue placeholder="Category" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">All Categories</SelectItem>
                                        {categories.map((cat) => (
                                            <SelectItem key={cat.id} value={cat.id}>
                                                {cat.name} ({cat.count})
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>

                                <Select>
                                    <SelectTrigger className="w-32 h-12">
                                        <SelectValue placeholder="Price" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">All</SelectItem>
                                        <SelectItem value="free">Free</SelectItem>
                                        <SelectItem value="paid">Paid</SelectItem>
                                    </SelectContent>
                                </Select>

                                <Select>
                                    <SelectTrigger className="w-40 h-12">
                                        <SelectValue placeholder="Sort by" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="newest">Newest First</SelectItem>
                                        <SelectItem value="popular">Most Popular</SelectItem>
                                        <SelectItem value="downloads">Most Downloaded</SelectItem>
                                        <SelectItem value="rating">Highest Rated</SelectItem>
                                    </SelectContent>
                                </Select>

                                <Button variant="outline" size="icon" className="h-12 w-12">
                                    <SlidersHorizontal className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Featured Workflows */}
                {featuredWorkflows.length > 0 && (
                    <section className="mb-12">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-bold">Featured Workflows</h2>
                            <Badge variant="secondary" className="px-3 py-1">
                                <Star className="w-3 h-3 mr-1" />
                                Editor's Choice
                            </Badge>
                        </div>
                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {featuredWorkflows.map((workflow) => (
                                <Card key={workflow.id} className="group hover:shadow-xl transition-all duration-300 border-2 border-primary/20">
                                    <div className="relative">
                                        {(workflow.coverImage || workflow.posterImage) && (
                                            <div className="aspect-video w-full overflow-hidden rounded-t-lg">
                                                <img
                                                    src={workflow.posterImage || workflow.coverImage || ''}
                                                    alt={`${workflow.title} preview`}
                                                    className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                                                />
                                            </div>
                                        )}
                                        <Badge className="absolute top-3 left-3 bg-primary">
                                            Featured
                                        </Badge>
                                        {workflow.isPaid && (
                                            <Badge variant="secondary" className="absolute top-3 right-3">
                                                ${workflow.price}
                                            </Badge>
                                        )}
                                    </div>
                                    <CardHeader>
                                        <CardTitle className="line-clamp-1 group-hover:text-primary transition-colors">
                                            {workflow.title}
                                        </CardTitle>
                                        <CardDescription className="line-clamp-2">
                                            {workflow.description}
                                        </CardDescription>
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
                                        <Button asChild className="w-full">
                                            <Link href={`/workflows/${workflow.id}`}>
                                                View Workflow
                                            </Link>
                                        </Button>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </section>
                )}

                {/* Categories Grid */}
                <section className="mb-12">
                    <h2 className="text-2xl font-bold mb-6">Browse by Category</h2>
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {categories.map((category) => (
                            <Card key={category.id} className="hover:shadow-lg transition-shadow cursor-pointer group">
                                <CardContent className="p-6">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h3 className="font-semibold group-hover:text-primary transition-colors">
                                                {category.name}
                                            </h3>
                                            <p className="text-sm text-muted-foreground">
                                                {category.count} workflows
                                            </p>
                                        </div>
                                        <div className="text-2xl opacity-60 group-hover:opacity-100 transition-opacity">
                                            {category.id === 'automation' && '⚡'}
                                            {category.id === 'integration' && '🔗'}
                                            {category.id === 'data-processing' && '📊'}
                                            {category.id === 'marketing' && '📢'}
                                            {category.id === 'productivity' && '🚀'}
                                            {category.id === 'e-commerce' && '🛒'}
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </section>

                {/* All Workflows Grid */}
                <section>
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold">All Workflows</h2>
                        <div className="flex items-center gap-2">
                            <span className="text-sm text-muted-foreground">
                                {allWorkflows.length} workflows found
                            </span>
                            <div className="flex border rounded-lg">
                                <Button variant="ghost" size="sm" className="rounded-r-none">
                                    <Grid3X3 className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="sm" className="rounded-l-none">
                                    <List className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    </div>

                    {allWorkflows.length === 0 ? (
                        <Card className="text-center py-12">
                            <CardContent>
                                <div className="text-6xl mb-4">🔍</div>
                                <h3 className="text-lg font-semibold mb-2">No workflows found</h3>
                                <p className="text-muted-foreground mb-6">
                                    Be the first to share your N8N workflow with the community!
                                </p>
                                <Button asChild size="lg">
                                    <Link href="/workflows/new">Create First Workflow</Link>
                                </Button>
                            </CardContent>
                        </Card>
                    ) : (
                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {allWorkflows.map((workflow) => (
                                <Card key={workflow.id} className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
                                    {(workflow.coverImage || workflow.posterImage) && (
                                        <div className="aspect-video w-full overflow-hidden">
                                            <img
                                                src={workflow.posterImage || workflow.coverImage || ''}
                                                alt={`${workflow.title} preview`}
                                                className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                                            />
                                        </div>
                                    )}
                                    <CardHeader>
                                        <div className="flex items-start justify-between">
                                            <div className="flex-1">
                                                <CardTitle className="line-clamp-1 group-hover:text-primary transition-colors">
                                                    {workflow.title}
                                                </CardTitle>
                                                <CardDescription className="line-clamp-2 mt-1">
                                                    {workflow.description}
                                                </CardDescription>
                                            </div>
                                            {workflow.isPaid ? (
                                                <Badge variant="secondary" className="ml-2 shrink-0">
                                                    <DollarSign className="w-3 h-3 mr-1" />
                                                    {workflow.price}
                                                </Badge>
                                            ) : (
                                                <Badge variant="outline" className="ml-2 shrink-0">
                                                    Free
                                                </Badge>
                                            )}
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                                            <span className="truncate">By {workflow.userName || workflow.userEmail}</span>
                                            <div className="flex items-center gap-3 shrink-0">
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
                </section>

                {/* Load More */}
                {allWorkflows.length > 0 && (
                    <div className="text-center mt-12">
                        <Button variant="outline" size="lg">
                            Load More Workflows
                        </Button>
                    </div>
                )}
            </div>
        </MainLayout>
    );
}