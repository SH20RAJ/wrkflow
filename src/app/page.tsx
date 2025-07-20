import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MainLayout } from "@/components/layout/main-layout";
import { APP_NAME, APP_DESCRIPTION } from "@/lib/constants";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Zap, 
  Users, 
  DollarSign, 
  TrendingUp, 
  Shield, 
  Rocket,
  Star,
  CheckCircle,
  ArrowRight,
  Play,
  Download,
  Eye,
  Code,
  Globe,
  Workflow
} from "lucide-react";

export default function Home() {
  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-background via-background to-muted/20">
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />
        <div className="relative container mx-auto px-4 py-16 sm:py-24 lg:py-32">
          <div className="mx-auto max-w-4xl text-center">
            <Badge variant="secondary" className="mb-6 px-4 py-2 text-sm font-medium">
              <Rocket className="mr-2 h-4 w-4" />
              The Ultimate N8N Workflow Marketplace
            </Badge>
            
            <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
              Build, Share & 
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                {" "}Monetize
              </span>
              <br />
              N8N Workflows
            </h1>
            
            <p className="mx-auto mb-8 max-w-2xl text-lg leading-8 text-muted-foreground sm:text-xl">
              Join the largest community of N8N automation experts. Discover powerful workflows, 
              share your creations, and earn from your automation expertise.
            </p>
            
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button size="lg" className="h-14 px-8 text-lg" asChild>
                <Link href="/workflows" className="flex items-center gap-2">
                  <Play className="h-5 w-5" />
                  Explore Workflows
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="h-14 px-8 text-lg" asChild>
                <Link href="/handler/sign-up" className="flex items-center gap-2">
                  <Rocket className="h-5 w-5" />
                  Start Creating
                </Link>
              </Button>
            </div>
            
            {/* Stats */}
            <div className="mt-16 grid grid-cols-2 gap-8 sm:grid-cols-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">1000+</div>
                <div className="text-sm text-muted-foreground">Workflows</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">500+</div>
                <div className="text-sm text-muted-foreground">Creators</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">50K+</div>
                <div className="text-sm text-muted-foreground">Downloads</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">99%</div>
                <div className="text-sm text-muted-foreground">Satisfaction</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 sm:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
              Why Choose Our Platform?
            </h2>
            <p className="text-lg text-muted-foreground">
              Everything you need to succeed in the N8N automation ecosystem
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-blue-600 p-2">
                    <Workflow className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle>Rich Workflow Library</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Access thousands of pre-built N8N workflows across all industries and use cases.
                </p>
              </CardContent>
            </Card>

            <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-green-600 p-2">
                    <DollarSign className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle>Monetize Your Skills</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Sell your workflows and earn passive income from your automation expertise.
                </p>
              </CardContent>
            </Card>

            <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-purple-50 to-violet-50 dark:from-purple-950/20 dark:to-violet-950/20">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-purple-600 p-2">
                    <Users className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle>Active Community</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Connect with fellow automation enthusiasts and learn from the best.
                </p>
              </CardContent>
            </Card>

            <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-950/20 dark:to-red-950/20">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-orange-600 p-2">
                    <Shield className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle>Secure & Reliable</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Enterprise-grade security with reliable hosting and 99.9% uptime guarantee.
                </p>
              </CardContent>
            </Card>

            <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-teal-50 to-cyan-50 dark:from-teal-950/20 dark:to-cyan-950/20">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-teal-600 p-2">
                    <TrendingUp className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle>Analytics & Insights</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Track performance, downloads, and earnings with detailed analytics.
                </p>
              </CardContent>
            </Card>

            <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-pink-50 to-rose-50 dark:from-pink-950/20 dark:to-rose-950/20">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-pink-600 p-2">
                    <Zap className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle>Easy Integration</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  One-click import to your N8N instance with detailed setup instructions.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 sm:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
              How It Works
            </h2>
            <p className="text-lg text-muted-foreground">
              Get started in minutes with our simple process
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <span className="text-2xl font-bold">1</span>
              </div>
              <h3 className="mb-4 text-xl font-semibold">Browse & Discover</h3>
              <p className="text-muted-foreground">
                Explore our extensive library of N8N workflows across different categories and use cases.
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <span className="text-2xl font-bold">2</span>
              </div>
              <h3 className="mb-4 text-xl font-semibold">Download & Import</h3>
              <p className="text-muted-foreground">
                One-click download with detailed setup instructions and video tutorials.
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <span className="text-2xl font-bold">3</span>
              </div>
              <h3 className="mb-4 text-xl font-semibold">Customize & Deploy</h3>
              <p className="text-muted-foreground">
                Adapt the workflow to your needs and deploy it in your N8N environment.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 sm:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
              What Our Users Say
            </h2>
            <p className="text-lg text-muted-foreground">
              Join thousands of satisfied automation experts
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-600 to-purple-600" />
                  <div>
                    <div className="font-semibold">Sarah Chen</div>
                    <div className="text-sm text-muted-foreground">Automation Consultant</div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-muted-foreground">
                  "This platform has revolutionized how I share my N8N workflows. The monetization features are fantastic!"
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-r from-green-600 to-teal-600" />
                  <div>
                    <div className="font-semibold">Marcus Rodriguez</div>
                    <div className="text-sm text-muted-foreground">DevOps Engineer</div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-muted-foreground">
                  "Found exactly what I needed for our CI/CD pipeline. The quality of workflows here is outstanding."
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-r from-purple-600 to-pink-600" />
                  <div>
                    <div className="font-semibold">Emily Johnson</div>
                    <div className="text-sm text-muted-foreground">Marketing Director</div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-muted-foreground">
                  "The marketing automation workflows saved us hundreds of hours. Highly recommend this platform!"
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-24 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="container mx-auto px-4 text-center">
          <div className="mx-auto max-w-2xl">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl mb-4">
              Ready to Transform Your Automation Game?
            </h2>
            <p className="text-lg text-blue-100 mb-8">
              Join thousands of creators and start monetizing your N8N expertise today.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button size="lg" variant="secondary" className="h-14 px-8 text-lg" asChild>
                <Link href="/handler/sign-up" className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5" />
                  Get Started Free
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="h-14 px-8 text-lg border-white text-white hover:bg-white hover:text-primary" asChild>
                <Link href="/workflows" className="flex items-center gap-2">
                  <Eye className="h-5 w-5" />
                  Browse Workflows
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}