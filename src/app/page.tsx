import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MainLayout } from "@/components/layout/main-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Search, 
  Workflow,
  ArrowRight,
  Play,
  Download,
  Star,
  Zap,
  Users,
  Globe,
  Sparkles,
  ChevronRight
} from "lucide-react";

// Mock data for featured workflows
const featuredWorkflows = [
  {
    id: "1",
    title: "E-commerce Order Automation",
    description: "Streamline order processing with automated inventory updates and customer notifications",
    author: "Sarah Chen",
    avatar: "https://i.pravatar.cc/40?img=1",
    downloads: 2847,
    rating: 4.9,
    price: null,
    tags: ["e-commerce", "automation", "notifications"]
  },
  {
    id: "2", 
    title: "Social Media Content Pipeline",
    description: "Auto-schedule and cross-post content across multiple social platforms",
    author: "Alex Morgan",
    avatar: "https://i.pravatar.cc/40?img=2",
    downloads: 1923,
    rating: 4.8,
    price: 29,
    tags: ["social-media", "content", "scheduling"]
  },
  {
    id: "3",
    title: "Customer Support Ticket Router",
    description: "Intelligently route support tickets based on keywords and urgency",
    author: "David Kim",
    avatar: "https://i.pravatar.cc/40?img=3", 
    downloads: 1456,
    rating: 4.7,
    price: null,
    tags: ["support", "automation", "routing"]
  }
];

const categories = [
  { name: "E-commerce", icon: "🛒", count: 127 },
  { name: "Marketing", icon: "📈", count: 89 },
  { name: "Support", icon: "🎧", count: 67 },
  { name: "Analytics", icon: "📊", count: 54 },
  { name: "Social Media", icon: "📱", count: 43 },
  { name: "Finance", icon: "💰", count: 38 }
];

export default function Home() {
  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="relative">
        <div className="container mx-auto px-4 py-12 lg:py-20">
          <div className="mx-auto max-w-4xl text-center">
            <Badge variant="outline" className="mb-6 border-primary/20 bg-primary/5 px-4 py-2 text-primary">
              <Sparkles className="mr-2 h-4 w-4" />
              Trusted by 10,000+ automation experts
            </Badge>
            
            <h1 className="mb-6 text-4xl font-bold tracking-tight lg:text-6xl">
              Discover workflows that
              <br />
              <span className="bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
                transform your business
              </span>
            </h1>
            
            <p className="mx-auto mb-10 max-w-2xl text-lg text-muted-foreground lg:text-xl">
              Browse, download, and deploy production-ready N8N workflows. 
              From simple automations to complex integrations.
            </p>

            {/* Search Bar */}
            <div className="mx-auto mb-12 max-w-2xl">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search workflows, creators, or tags..."
                  className="h-14 pl-12 pr-32 text-lg"
                />
                <Button 
                  size="sm" 
                  className="absolute right-2 top-1/2 h-10 -translate-y-1/2"
                >
                  Search
                </Button>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-8 lg:gap-12">
              <div className="text-center">
                <div className="text-3xl font-bold lg:text-4xl">1,247</div>
                <div className="text-sm text-muted-foreground lg:text-base">Workflows</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold lg:text-4xl">47K+</div>
                <div className="text-sm text-muted-foreground lg:text-base">Downloads</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold lg:text-4xl">324</div>
                <div className="text-sm text-muted-foreground lg:text-base">Creators</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="bg-muted/30 py-12">
        <div className="container mx-auto px-4">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-2xl font-semibold">Browse by Category</h2>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/categories" className="group">
                View all
                <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-4 lg:grid-cols-6">
            {categories.map((category) => (
              <Card 
                key={category.name}
                className="group cursor-pointer border-0 bg-background/60 backdrop-blur-sm transition-all hover:bg-background hover:shadow-md"
              >
                <CardContent className="p-6 text-center">
                  <div className="mb-3 text-3xl">{category.icon}</div>
                  <div className="font-medium">{category.name}</div>
                  <div className="text-sm text-muted-foreground">{category.count} workflows</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Workflows */}
      <section className="py-12 lg:py-16">
        <div className="container mx-auto px-4">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-semibold lg:text-3xl">Featured Workflows</h2>
              <p className="text-muted-foreground">Handpicked by our community</p>
            </div>
            <Button variant="outline" asChild>
              <Link href="/workflows" className="group">
                Explore all
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {featuredWorkflows.map((workflow) => (
              <Card 
                key={workflow.id}
                className="group cursor-pointer border-0 bg-gradient-to-br from-background to-muted/20 transition-all hover:shadow-lg hover:shadow-primary/5"
              >
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg leading-tight group-hover:text-primary transition-colors">
                        {workflow.title}
                      </CardTitle>
                      <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                        {workflow.description}
                      </p>
                    </div>
                    {workflow.price ? (
                      <Badge variant="secondary" className="ml-2">
                        ${workflow.price}
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="ml-2">
                        Free
                      </Badge>
                    )}
                  </div>
                </CardHeader>

                <CardContent className="pt-0">
                  <div className="mb-4 flex flex-wrap gap-1">
                    {workflow.tags.slice(0, 3).map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={workflow.avatar} />
                        <AvatarFallback>{workflow.author[0]}</AvatarFallback>
                      </Avatar>
                      <div className="text-sm">
                        <div className="font-medium">{workflow.author}</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-current text-yellow-500" />
                        {workflow.rating}
                      </div>
                      <div className="flex items-center gap-1">
                        <Download className="h-4 w-4" />
                        {workflow.downloads.toLocaleString()}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-muted/30 py-12 lg:py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-4 text-2xl font-semibold lg:text-3xl">
              Why developers choose Wrkflow
            </h2>
            <p className="mb-12 text-lg text-muted-foreground">
              Join the fastest-growing N8N community and accelerate your automation journey
            </p>

            <div className="grid gap-8 lg:grid-cols-3">
              <div className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
                  <Zap className="h-8 w-8 text-primary" />
                </div>
                <h3 className="mb-2 font-semibold">Production Ready</h3>
                <p className="text-sm text-muted-foreground">
                  Battle-tested workflows used by thousands of businesses worldwide
                </p>
              </div>

              <div className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <h3 className="mb-2 font-semibold">Expert Community</h3>
                <p className="text-sm text-muted-foreground">
                  Learn from automation experts and get help when you need it
                </p>
              </div>

              <div className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
                  <Globe className="h-8 w-8 text-primary" />
                </div>
                <h3 className="mb-2 font-semibold">Always Updated</h3>
                <p className="text-sm text-muted-foreground">
                  Workflows are constantly updated to work with the latest APIs
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 lg:py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="mb-4 text-2xl font-semibold lg:text-3xl">
              Ready to automate your workflow?
            </h2>
            <p className="mb-8 text-lg text-muted-foreground">
              Start building powerful automations today. Join thousands of developers who trust Wrkflow.
            </p>

            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button size="lg" className="h-12 px-8" asChild>
                <Link href="/workflows">
                  <Play className="mr-2 h-5 w-5" />
                  Browse Workflows
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="h-12 px-8" asChild>
                <Link href="/auth/signup">
                  <Workflow className="mr-2 h-5 w-5" />
                  Start Creating
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}