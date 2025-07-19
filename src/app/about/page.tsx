import { MainLayout } from "@/components/layout/main-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, Zap, Heart, Target, Globe, Shield } from "lucide-react";
import Link from "next/link";
import { APP_NAME } from "@/lib/constants";

export default function AboutPage() {
    return (
        <MainLayout>
            <div className="container mx-auto py-8">
                {/* Hero Section */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl font-bold mb-4">About {APP_NAME}</h1>
                    <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                        We're building the world's largest marketplace for N8N automation workflows, 
                        empowering creators to share, discover, and monetize their automation expertise.
                    </p>
                </div>

                {/* Mission Section */}
                <div className="mb-16">
                    <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-none">
                        <CardContent className="p-8">
                            <div className="text-center">
                                <Target className="h-12 w-12 mx-auto mb-4 text-blue-600" />
                                <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
                                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                                    To democratize automation by creating a vibrant ecosystem where N8N workflow creators 
                                    can share their expertise, earn from their work, and help others build better automations.
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Features Grid */}
                <div className="mb-16">
                    <h2 className="text-3xl font-bold text-center mb-8">Why Choose {APP_NAME}?</h2>
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        <Card>
                            <CardHeader>
                                <Users className="h-8 w-8 text-blue-600 mb-2" />
                                <CardTitle>Community Driven</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground">
                                    Built by the community, for the community. Every workflow is created and shared by real N8N users.
                                </p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <Zap className="h-8 w-8 text-yellow-600 mb-2" />
                                <CardTitle>Ready to Use</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground">
                                    All workflows come with detailed documentation, setup guides, and are ready to import into your N8N instance.
                                </p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <Heart className="h-8 w-8 text-red-600 mb-2" />
                                <CardTitle>Creator Friendly</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground">
                                    Monetize your expertise. Set your own prices and earn from your workflow creations.
                                </p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <Globe className="h-8 w-8 text-green-600 mb-2" />
                                <CardTitle>Global Reach</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground">
                                    Connect with N8N users worldwide. Share your workflows with a global community of automation enthusiasts.
                                </p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <Shield className="h-8 w-8 text-purple-600 mb-2" />
                                <CardTitle>Quality Assured</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground">
                                    Every workflow is reviewed and tested to ensure quality and security for our community.
                                </p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <Zap className="h-8 w-8 text-orange-600 mb-2" />
                                <CardTitle>Always Growing</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground">
                                    New workflows added daily. Stay up-to-date with the latest automation trends and techniques.
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </div>

                {/* Stats Section */}
                <div className="mb-16">
                    <Card>
                        <CardContent className="p-8">
                            <h2 className="text-2xl font-bold text-center mb-8">Platform Statistics</h2>
                            <div className="grid gap-8 md:grid-cols-4 text-center">
                                <div>
                                    <div className="text-3xl font-bold text-blue-600 mb-2">1,000+</div>
                                    <div className="text-muted-foreground">Workflows</div>
                                </div>
                                <div>
                                    <div className="text-3xl font-bold text-green-600 mb-2">500+</div>
                                    <div className="text-muted-foreground">Creators</div>
                                </div>
                                <div>
                                    <div className="text-3xl font-bold text-purple-600 mb-2">10,000+</div>
                                    <div className="text-muted-foreground">Downloads</div>
                                </div>
                                <div>
                                    <div className="text-3xl font-bold text-orange-600 mb-2">50+</div>
                                    <div className="text-muted-foreground">Categories</div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* CTA Section */}
                <div className="text-center">
                    <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
                    <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                        Join thousands of automation enthusiasts who are already sharing and discovering amazing N8N workflows.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button size="lg" asChild>
                            <Link href="/workflows">Browse Workflows</Link>
                        </Button>
                        <Button size="lg" variant="outline" asChild>
                            <Link href="/handler/sign-up">Join the Community</Link>
                        </Button>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}