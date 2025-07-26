'use client';

import { MainLayout } from "@/components/layout/main-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  Search, 
  Eye, 
  Download, 
  Star, 
  DollarSign,
  Grid3X3,
  List,
  SlidersHorizontal,
  Sparkles,
  Heart,
  Share2,
  ExternalLink
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState, useCallback } from "react";

interface Workflow {
    id: string;
    title: string;
    description: string;
    isPaid: boolean;
    price: number | null;
    viewCount: number;
    downloadCount: number;
    createdAt: string;
    coverImage: string | null;
    posterImage: string | null;
    tags: string | null;
    categoryId: string | null;
    userName: string | null;
    userEmail: string | null;
    userAvatar: string | null;
}

interface Category {
    id: string;
    name: string;
    count: number;
}

interface WorkflowsResponse {
    success: boolean;
    workflows: Workflow[];
    featured: Workflow[];
    pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
        hasNext: boolean;
        hasPrev: boolean;
    };
    stats: {
        totalWorkflows: number;
        totalDownloads: number;
        freeWorkflows: number;
    };
}

interface CategoriesResponse {
    success: boolean;
    categories: Category[];
}

export default function WorkflowsPage() {
    const [workflows, setWorkflows] = useState<Workflow[]>([]);
    const [featured, setFeatured] = useState<Workflow[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [priceFilter, setPriceFilter] = useState('all');
    const [sortBy, setSortBy] = useState('newest');
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [page, setPage] = useState(1);
    const [stats, setStats] = useState({
        totalWorkflows: 0,
        totalDownloads: 0,
        freeWorkflows: 0,
    });
    const [pagination, setPagination] = useState({
        page: 1,
        limit: 12,
        total: 0,
        totalPages: 0,
        hasNext: false,
        hasPrev: false,
    });

    // Fetch workflows
    const fetchWorkflows = useCallback(async () => {
        setLoading(true);
        try {
            const params = new URLSearchParams({
                search: searchTerm,
                category: selectedCategory,
                price: priceFilter,
                sort: sortBy,
                page: page.toString(),
                limit: '12',
            });

            const response = await fetch(`/api/workflows?${params}`);
            const data: WorkflowsResponse = await response.json();
            
            if (data.success) {
                setWorkflows(data.workflows);
                setFeatured(data.featured);
                setStats(data.stats);
                setPagination(data.pagination);
            }
        } catch (error) {
            console.error('Error fetching workflows:', error);
        } finally {
            setLoading(false);
        }
    }, [searchTerm, selectedCategory, priceFilter, sortBy, page]);

    // Fetch categories
    const fetchCategories = async () => {
        try {
            const response = await fetch('/api/categories');
            const data: CategoriesResponse = await response.json();
            
            if (data.success) {
                setCategories(data.categories);
            }
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    // Initial load
    useEffect(() => {
        fetchCategories();
    }, []);

    // Fetch workflows when filters change
    useEffect(() => {
        fetchWorkflows();
    }, [fetchWorkflows]);

    // Debounced search
    useEffect(() => {
        const timer = setTimeout(() => {
            setPage(1); // Reset to first page on search
        }, 500);
        return () => clearTimeout(timer);
    }, [searchTerm]);

    const WorkflowCard = ({ workflow, featured = false }: { workflow: Workflow; featured?: boolean }) => (
        <Card className={`group hover:shadow-xl transition-all duration-300 overflow-hidden ${
            featured ? 'border-2 border-primary/20 bg-gradient-to-br from-background to-primary/5' : ''
        }`}>
            <div className="relative">
                {(workflow.coverImage || workflow.posterImage) ? (
                    <div className="aspect-video w-full overflow-hidden">
                        <Image
                            src={workflow.posterImage || workflow.coverImage || ''}
                            alt={`${workflow.title} preview`}
                            width={400}
                            height={225}
                            className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                    </div>
                ) : (
                    <div className="aspect-video w-full bg-gradient-to-br from-primary/10 to-primary/20 flex items-center justify-center">
                        <div className="text-6xl opacity-20">⚡</div>
                    </div>
                )}
                
                {featured && (
                    <Badge className="absolute top-3 left-3 bg-primary text-primary-foreground shadow-lg">
                        <Sparkles className="w-3 h-3 mr-1" />
                        Featured
                    </Badge>
                )}
                
                {workflow.isPaid ? (
                    <Badge variant="secondary" className="absolute top-3 right-3 bg-green-100 text-green-800 shadow-lg">
                        <DollarSign className="w-3 h-3 mr-1" />
                        ${workflow.price}
                    </Badge>
                ) : (
                    <Badge variant="outline" className="absolute top-3 right-3 bg-background/90 shadow-lg">
                        Free
                    </Badge>
                )}
            </div>
            
            <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                    <div className="flex-1">
                        <CardTitle className="line-clamp-2 group-hover:text-primary transition-colors text-lg">
                            {workflow.title}
                        </CardTitle>
                        <CardDescription className="line-clamp-2 mt-2 text-sm">
                            {workflow.description}
                        </CardDescription>
                    </div>
                </div>
            </CardHeader>
            
            <CardContent className="pt-0">
                {/* Author and Stats */}
                <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                    <div className="flex items-center gap-2">
                        {workflow.userAvatar && (
                            <Image 
                                src={workflow.userAvatar} 
                                alt={workflow.userName || 'User'} 
                                width={24}
                                height={24}
                                className="w-6 h-6 rounded-full"
                            />
                        )}
                        <span className="truncate">
                            {workflow.userName || workflow.userEmail?.split('@')[0] || 'Anonymous'}
                        </span>
                    </div>
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

                {/* Tags */}
                {workflow.tags && (
                    <div className="flex flex-wrap gap-1 mb-4">
                        {JSON.parse(workflow.tags || '[]').slice(0, 3).map((tag: string, index: number) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                                {tag}
                            </Badge>
                        ))}
                    </div>
                )}

                {/* Actions */}
                <div className="flex gap-2">
                    <Button asChild className="flex-1 h-9">
                        <Link href={`/workflows/${workflow.id}`}>
                            View Details
                            <ExternalLink className="w-3 h-3 ml-2" />
                        </Link>
                    </Button>
                    <Button variant="outline" size="sm" className="h-9 px-3">
                        <Heart className="h-3 w-3" />
                    </Button>
                    <Button variant="outline" size="sm" className="h-9 px-3">
                        <Share2 className="h-3 w-3" />
                    </Button>
                </div>
            </CardContent>
        </Card>
    );

    const LoadingSkeleton = () => (
        <Card className="overflow-hidden">
            <Skeleton className="aspect-video w-full" />
            <CardHeader>
                <Skeleton className="h-5 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
            </CardHeader>
            <CardContent>
                <div className="flex justify-between mb-4">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-4 w-16" />
                </div>
                <Skeleton className="h-9 w-full" />
            </CardContent>
        </Card>
    );

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
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
                        Browse thousands of professional automation workflows. From simple integrations to complex business processes.
                    </p>
                    
                    {/* Quick Stats */}
                    <div className="flex justify-center gap-8 text-sm">
                        <div className="text-center">
                            <div className="text-2xl font-bold text-primary">{stats.totalWorkflows}</div>
                            <div className="text-muted-foreground">Total Workflows</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl font-bold text-primary">{stats.totalDownloads}</div>
                            <div className="text-muted-foreground">Downloads</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl font-bold text-primary">{stats.freeWorkflows}</div>
                            <div className="text-muted-foreground">Free Workflows</div>
                        </div>
                    </div>
                </div>

                {/* Search and Filter Section */}
                <Card className="mb-8 shadow-lg">
                    <CardContent className="p-6">
                        <div className="flex flex-col lg:flex-row gap-4">
                            {/* Search */}
                            <div className="relative flex-1">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                                <Input
                                    placeholder="Search workflows by name, description, or tags..."
                                    className="pl-10 h-12"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                            
                            {/* Filters */}
                            <div className="flex gap-3">
                                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
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

                                <Select value={priceFilter} onValueChange={setPriceFilter}>
                                    <SelectTrigger className="w-32 h-12">
                                        <SelectValue placeholder="Price" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">All</SelectItem>
                                        <SelectItem value="free">Free</SelectItem>
                                        <SelectItem value="paid">Paid</SelectItem>
                                    </SelectContent>
                                </Select>

                                <Select value={sortBy} onValueChange={setSortBy}>
                                    <SelectTrigger className="w-40 h-12">
                                        <SelectValue placeholder="Sort by" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="newest">Newest First</SelectItem>
                                        <SelectItem value="popular">Most Popular</SelectItem>
                                        <SelectItem value="downloads">Most Downloaded</SelectItem>
                                        <SelectItem value="oldest">Oldest First</SelectItem>
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
                {!loading && featured.length > 0 && (
                    <section className="mb-12">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-bold">Featured Workflows</h2>
                            <Badge variant="secondary" className="px-3 py-1">
                                <Star className="w-3 h-3 mr-1" />
                                Editor's Choice
                            </Badge>
                        </div>
                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {featured.map((workflow) => (
                                <WorkflowCard key={workflow.id} workflow={workflow} featured />
                            ))}
                        </div>
                    </section>
                )}

                {/* Categories Grid */}
                {categories.length > 0 && (
                    <section className="mb-12">
                        <h2 className="text-2xl font-bold mb-6">Browse by Category</h2>
                        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                            {categories.map((category) => (
                                <Card key={category.id} className="hover:shadow-lg transition-shadow cursor-pointer group"
                                      onClick={() => setSelectedCategory(category.id)}>
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
                                                ⚡
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </section>
                )}

                {/* All Workflows Grid */}
                <section>
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold">
                            {searchTerm ? `Search Results for "${searchTerm}"` : 'All Workflows'}
                        </h2>
                        <div className="flex items-center gap-4">
                            <span className="text-sm text-muted-foreground">
                                {pagination.total} workflows found
                            </span>
                            <div className="flex border rounded-lg">
                                <Button 
                                    variant={viewMode === 'grid' ? 'default' : 'ghost'} 
                                    size="sm" 
                                    className="rounded-r-none"
                                    onClick={() => setViewMode('grid')}
                                >
                                    <Grid3X3 className="h-4 w-4" />
                                </Button>
                                <Button 
                                    variant={viewMode === 'list' ? 'default' : 'ghost'} 
                                    size="sm" 
                                    className="rounded-l-none"
                                    onClick={() => setViewMode('list')}
                                >
                                    <List className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    </div>

                    {loading ? (
                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {Array.from({ length: 6 }).map((_, i) => (
                                <LoadingSkeleton key={i} />
                            ))}
                        </div>
                    ) : workflows.length === 0 ? (
                        <Card className="text-center py-12">
                            <CardContent>
                                <div className="text-6xl mb-4">🔍</div>
                                <h3 className="text-lg font-semibold mb-2">No workflows found</h3>
                                <p className="text-muted-foreground mb-6">
                                    {searchTerm ? 'Try adjusting your search terms or filters.' : 'Be the first to share your N8N workflow with the community!'}
                                </p>
                                <Button asChild size="lg">
                                    <Link href="/workflows/new">Create First Workflow</Link>
                                </Button>
                            </CardContent>
                        </Card>
                    ) : (
                        <div className={`grid gap-6 ${viewMode === 'grid' ? 'md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
                            {workflows.map((workflow) => (
                                <WorkflowCard key={workflow.id} workflow={workflow} />
                            ))}
                        </div>
                    )}
                </section>

                {/* Pagination */}
                {pagination.totalPages > 1 && (
                    <div className="flex justify-center items-center gap-4 mt-12">
                        <Button 
                            variant="outline" 
                            disabled={!pagination.hasPrev}
                            onClick={() => setPage(page - 1)}
                        >
                            Previous
                        </Button>
                        <span className="text-sm text-muted-foreground">
                            Page {pagination.page} of {pagination.totalPages}
                        </span>
                        <Button 
                            variant="outline" 
                            disabled={!pagination.hasNext}
                            onClick={() => setPage(page + 1)}
                        >
                            Next
                        </Button>
                    </div>
                )}
            </div>
        </MainLayout>
    );
}
