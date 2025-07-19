import { requireAuth } from "@/lib/auth";
import { MainLayout } from "@/components/layout/main-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { ArrowLeft, Upload } from "lucide-react";
import Link from "next/link";
import { createWorkflow } from "./actions";
import { FormSubmitButton } from "@/components/ui/form-submit-button";

export default async function NewWorkflowPage() {
    const user = await requireAuth();

    return (
        <MainLayout>
            <div className="container mx-auto py-8 max-w-4xl">
                <div className="mb-8">
                    <Button variant="ghost" asChild className="mb-4">
                        <Link href="/dashboard" className="flex items-center gap-2">
                            <ArrowLeft className="h-4 w-4" />
                            Back to Dashboard
                        </Link>
                    </Button>
                    <h1 className="text-3xl font-bold mb-2">Create New Workflow</h1>
                    <p className="text-muted-foreground">
                        Share your N8N workflow with the community
                    </p>
                </div>

                <form action={createWorkflow} className="space-y-8">
                    <Card>
                        <CardHeader>
                            <CardTitle>Basic Information</CardTitle>
                            <CardDescription>
                                Provide basic details about your workflow
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="title">Title *</Label>
                                <Input
                                    id="title"
                                    name="title"
                                    placeholder="Enter workflow title"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="description">Description *</Label>
                                <Textarea
                                    id="description"
                                    name="description"
                                    placeholder="Describe what your workflow does"
                                    rows={4}
                                    required
                                />
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Workflow Data</CardTitle>
                            <CardDescription>
                                Upload your N8N workflow JSON file or paste the content
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="jsonFile">Upload JSON File</Label>
                                <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                                    <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                                    <p className="text-sm text-muted-foreground mb-2">
                                        Drop your N8N workflow JSON file here, or click to browse
                                    </p>
                                    <Input
                                        id="jsonFile"
                                        name="jsonFile"
                                        type="file"
                                        accept=".json"
                                        className="hidden"
                                    />
                                    <Button variant="outline" type="button">
                                        Choose File
                                    </Button>
                                </div>
                            </div>
                            <div className="text-center text-sm text-muted-foreground">
                                OR
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="jsonContent">Paste JSON Content</Label>
                                <Textarea
                                    id="jsonContent"
                                    name="jsonContent"
                                    placeholder="Paste your N8N workflow JSON here..."
                                    rows={8}
                                    className="font-mono text-sm"
                                />
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Monetization</CardTitle>
                            <CardDescription>
                                Set pricing for your workflow (optional)
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center space-x-2">
                                <Switch id="isPaid" name="isPaid" />
                                <Label htmlFor="isPaid">Make this a paid workflow</Label>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="price">Price (USD)</Label>
                                <Input
                                    id="price"
                                    name="price"
                                    type="number"
                                    step="0.01"
                                    min="0"
                                    placeholder="0.00"
                                />
                                <p className="text-xs text-muted-foreground">
                                    Leave empty or 0 for free workflows
                                </p>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Documentation</CardTitle>
                            <CardDescription>
                                Help users understand how to use your workflow
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="howItWorks">How It Works</Label>
                                <Textarea
                                    id="howItWorks"
                                    name="howItWorks"
                                    placeholder="Explain how your workflow works (supports Markdown)"
                                    rows={6}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="stepByStep">Step-by-Step Guide</Label>
                                <Textarea
                                    id="stepByStep"
                                    name="stepByStep"
                                    placeholder="Provide a step-by-step setup guide (supports Markdown)"
                                    rows={6}
                                />
                            </div>
                        </CardContent>
                    </Card>

                    <div className="flex gap-4">
                        <FormSubmitButton className="flex-1">
                            Publish Workflow
                        </FormSubmitButton>
                        <Button type="button" variant="outline" asChild>
                            <Link href="/dashboard">Cancel</Link>
                        </Button>
                    </div>
                </form>
            </div>
        </MainLayout>
    );
}