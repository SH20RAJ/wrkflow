'use client';

import { useState } from "react";
import { MainLayout } from "@/components/layout/main-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Upload, Copy, Eye, EyeOff, Image, Video, FileText, ChevronRight, ChevronLeft, Check } from "lucide-react";
import Link from "next/link";
import { createWorkflow } from "./actions";
import { FormSubmitButton } from "@/components/ui/form-submit-button";
import { FileUpload } from "@/components/ui/file-upload";
import { MediaGallery } from "@/components/ui/media-gallery";
import { YouTubeEmbed } from "@/components/ui/youtube-embed";
import { Badge } from "@/components/ui/badge";

interface MediaItem {
    id: string;
    url: string;
    type: 'image' | 'video';
    caption?: string;
}

export default function NewWorkflowPage() {
    const [currentStep, setCurrentStep] = useState(1);
    const [jsonInput, setJsonInput] = useState('');
    const [jsonUrl, setJsonUrl] = useState('');
    const [inputMethod, setInputMethod] = useState<'paste' | 'url'>('paste');
    const [jsonError, setJsonError] = useState('');
    const [jsonPreview, setJsonPreview] = useState<Record<string, unknown> | null>(null);
    const [tags, setTags] = useState<string[]>([]);
    const [newTag, setNewTag] = useState('');
    
    // New media states
    const [youtubeUrl, setYoutubeUrl] = useState('');
    const [posterImage, setPosterImage] = useState('');
    const [screenshots, setScreenshots] = useState<MediaItem[]>([]);
    const [demoImages, setDemoImages] = useState<MediaItem[]>([]);

    const steps = [
        { id: 1, title: "Basic Info", description: "Title, description, and category", icon: FileText },
        { id: 2, title: "Media & Demo", description: "Images, videos, and screenshots", icon: Image },
        { id: 3, title: "Workflow Data", description: "JSON content and configuration", icon: Upload },
        { id: 4, title: "Documentation", description: "How it works and instructions", icon: Video }
    ];

    const validateJson = (jsonString: string) => {
        try {
            const parsed = JSON.parse(jsonString);
            setJsonError('');
            setJsonPreview(parsed);
            return true;
        } catch (error) {
            setJsonError('Invalid JSON format');
            setJsonPreview(null);
            return false;
        }
    };

    const handleJsonInputChange = (value: string) => {
        setJsonInput(value);
        if (value.trim()) {
            validateJson(value);
        } else {
            setJsonError('');
            setJsonPreview(null);
        }
    };

    const addTag = () => {
        if (newTag.trim() && !tags.includes(newTag.trim())) {
            setTags([...tags, newTag.trim()]);
            setNewTag('');
        }
    };

    const removeTag = (tagToRemove: string) => {
        setTags(tags.filter(tag => tag !== tagToRemove));
    };

    const handleScreenshotsChange = (items: MediaItem[]) => {
        setScreenshots(items);
    };

    const handleDemoImagesChange = (items: MediaItem[]) => {
        setDemoImages(items);
    };

    const nextStep = () => {
        if (currentStep < steps.length) {
            setCurrentStep(currentStep + 1);
        }
    };

    const prevStep = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };

    const handleSubmit = async (formData: FormData) => {
        // Add media data to form
        formData.append('youtubeUrl', youtubeUrl);
        formData.append('posterImage', posterImage);
        formData.append('screenshots', JSON.stringify(screenshots));
        formData.append('demoImages', JSON.stringify(demoImages));
        formData.append('tags', JSON.stringify(tags));
        
        await createWorkflow(formData);
    };

    return (
        <MainLayout>
            <div className="container mx-auto px-4 py-8 max-w-6xl">
                <div className="mb-8">
                    <Link href="/workflows" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-4">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Workflows
                    </Link>
                    <h1 className="text-3xl font-bold">Create New Workflow</h1>
                    <p className="text-muted-foreground mt-2">
                        Share your N8N workflow with the community
                    </p>
                </div>

                {/* Progress Steps */}
                <div className="mb-8">
                    <div className="flex items-center justify-between max-w-4xl mx-auto">
                        {steps.map((step, index) => {
                            const Icon = step.icon;
                            const isActive = currentStep === step.id;
                            const isCompleted = currentStep > step.id;
                            
                            return (
                                <div key={step.id} className="flex items-center">
                                    <div className={`flex flex-col items-center ${isActive ? 'text-primary' : isCompleted ? 'text-green-600' : 'text-muted-foreground'}`}>
                                        <div className={`flex items-center justify-center w-12 h-12 rounded-full border-2 mb-2 ${
                                            isActive 
                                                ? 'bg-primary border-primary text-primary-foreground' 
                                                : isCompleted
                                                ? 'bg-green-600 border-green-600 text-white'
                                                : 'border-muted-foreground'
                                        }`}>
                                            {isCompleted ? <Check className="w-5 h-5" /> : <Icon className="w-5 h-5" />}
                                        </div>
                                        <div className="text-center">
                                            <p className="text-sm font-medium">{step.title}</p>
                                            <p className="text-xs text-muted-foreground hidden sm:block">{step.description}</p>
                                        </div>
                                    </div>
                                    {index < steps.length - 1 && (
                                        <div className={`hidden sm:block w-16 h-0.5 mx-4 ${
                                            currentStep > step.id ? 'bg-green-600' : 'bg-muted'
                                        }`} />
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>

                <form action={handleSubmit} className="space-y-8">
                    {/* Step 1: Basic Information */}
                    {currentStep === 1 && (
                        <div className="space-y-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <FileText className="w-5 h-5" />
                                        Basic Information
                                    </CardTitle>
                                    <CardDescription>
                                        Provide essential details about your workflow
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <Label htmlFor="title">Workflow Title *</Label>
                                            <Input
                                                id="title"
                                                name="title"
                                                placeholder="e.g., Automated Email Marketing Campaign"
                                                required
                                                className="text-lg"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="categoryId">Category</Label>
                                            <Select name="categoryId">
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select a category" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="automation">Automation</SelectItem>
                                                    <SelectItem value="integration">Integration</SelectItem>
                                                    <SelectItem value="data-processing">Data Processing</SelectItem>
                                                    <SelectItem value="marketing">Marketing</SelectItem>
                                                    <SelectItem value="productivity">Productivity</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>
                                    
                                    <div className="space-y-2">
                                        <Label htmlFor="description">Description *</Label>
                                        <Textarea
                                            id="description"
                                            name="description"
                                            placeholder="Describe what your workflow does, its benefits, and use cases..."
                                            required
                                            rows={4}
                                            className="resize-none"
                                        />
                                        <p className="text-xs text-muted-foreground">
                                            Supports Markdown formatting
                                        </p>
                                    </div>

                                    <div className="space-y-4">
                                        <Label>Tags</Label>
                                        <div className="flex flex-wrap gap-2 mb-2">
                                            {tags.map((tag) => (
                                                <Badge key={tag} variant="secondary" className="cursor-pointer" onClick={() => removeTag(tag)}>
                                                    {tag} ×
                                                </Badge>
                                            ))}
                                        </div>
                                        <div className="flex gap-2">
                                            <Input
                                                placeholder="Add a tag..."
                                                value={newTag}
                                                onChange={(e) => setNewTag(e.target.value)}
                                                onKeyDown={(e) => {
                                                    if (e.key === 'Enter') {
                                                        e.preventDefault();
                                                        addTag();
                                                    }
                                                }}
                                            />
                                            <Button type="button" onClick={addTag} variant="outline">
                                                Add
                                            </Button>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="flex items-center space-x-2">
                                            <Switch id="isPaid" name="isPaid" />
                                            <Label htmlFor="isPaid">Paid Workflow</Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <Switch id="isPrivate" name="isPrivate" />
                                            <Label htmlFor="isPrivate">Private Workflow</Label>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    )}

                    {/* Step 2: Media & Demo */}
                    {currentStep === 2 && (
                        <div className="space-y-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Image className="w-5 h-5" />
                                        Media & Demo Content
                                    </CardTitle>
                                    <CardDescription>
                                        Add visual content to showcase your workflow
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-8">
                                    {/* Poster Image */}
                                    <div className="space-y-4">
                                        <div>
                                            <Label htmlFor="posterImage">Poster Image</Label>
                                            <p className="text-sm text-muted-foreground">Main image that represents your workflow</p>
                                        </div>
                                        <Input
                                            id="posterImage"
                                            name="posterImage"
                                            placeholder="https://example.com/poster.jpg"
                                            value={posterImage}
                                            onChange={(e) => setPosterImage(e.target.value)}
                                        />
                                        {posterImage && (
                                            <div className="max-w-md">
                                                <img 
                                                    src={posterImage} 
                                                    alt="Poster preview" 
                                                    className="w-full rounded-lg border"
                                                    onError={(e) => {
                                                        const target = e.target as HTMLImageElement;
                                                        target.style.display = 'none';
                                                    }}
                                                />
                                            </div>
                                        )}
                                    </div>

                                    {/* YouTube Demo Video */}
                                    <div className="space-y-4">
                                        <div>
                                            <Label>Demo Video</Label>
                                            <p className="text-sm text-muted-foreground">Add a YouTube video demonstrating your workflow</p>
                                        </div>
                                        <YouTubeEmbed
                                            url={youtubeUrl}
                                            onUrlChange={setYoutubeUrl}
                                            editable={true}
                                        />
                                    </div>

                                    {/* Screenshots */}
                                    <div className="space-y-4">
                                        <div>
                                            <Label>Screenshots</Label>
                                            <p className="text-sm text-muted-foreground">Add screenshots of your workflow in action</p>
                                        </div>
                                        <MediaGallery
                                            items={screenshots}
                                            onItemsChange={handleScreenshotsChange}
                                            maxItems={8}
                                            type="image"
                                        />
                                    </div>

                                    {/* Demo Images */}
                                    <div className="space-y-4">
                                        <div>
                                            <Label>Demo Images</Label>
                                            <p className="text-sm text-muted-foreground">Additional images showing workflow results or setup</p>
                                        </div>
                                        <MediaGallery
                                            items={demoImages}
                                            onItemsChange={handleDemoImagesChange}
                                            maxItems={6}
                                            type="image"
                                        />
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    )}

                    {/* Step 3: Workflow Data */}
                    {currentStep === 3 && (
                        <div className="space-y-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Upload className="w-5 h-5" />
                                        Workflow Data
                                    </CardTitle>
                                    <CardDescription>
                                        Upload your N8N workflow JSON file or paste the content
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <div className="flex gap-4 mb-4">
                                        <Button
                                            type="button"
                                            variant={inputMethod === 'paste' ? 'default' : 'outline'}
                                            onClick={() => setInputMethod('paste')}
                                        >
                                            Paste JSON
                                        </Button>
                                        <Button
                                            type="button"
                                            variant={inputMethod === 'url' ? 'default' : 'outline'}
                                            onClick={() => setInputMethod('url')}
                                        >
                                            JSON URL
                                        </Button>
                                    </div>

                                    {inputMethod === 'paste' ? (
                                        <div className="space-y-4">
                                            <Textarea
                                                name="jsonContent"
                                                placeholder="Paste your N8N workflow JSON here..."
                                                value={jsonInput}
                                                onChange={(e) => handleJsonInputChange(e.target.value)}
                                                rows={12}
                                                className="font-mono text-sm"
                                            />
                                            {jsonError && (
                                                <p className="text-sm text-destructive">{jsonError}</p>
                                            )}
                                            {jsonPreview && (
                                                <div className="p-4 bg-muted rounded-lg">
                                                    <p className="text-sm text-green-600 font-medium">✓ Valid JSON format</p>
                                                </div>
                                            )}
                                        </div>
                                    ) : (
                                        <div className="space-y-4">
                                            <Input
                                                name="jsonUrl"
                                                placeholder="https://raw.githubusercontent.com/user/repo/workflow.json"
                                                value={jsonUrl}
                                                onChange={(e) => setJsonUrl(e.target.value)}
                                            />
                                            <p className="text-sm text-muted-foreground">
                                                Provide a direct link to your JSON file (GitHub, Gist, Google Drive, etc.)
                                            </p>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        </div>
                    )}

                    {/* Step 4: Documentation */}
                    {currentStep === 4 && (
                        <div className="space-y-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Video className="w-5 h-5" />
                                        Documentation
                                    </CardTitle>
                                    <CardDescription>
                                        Help users understand and implement your workflow
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="howItWorks">How It Works</Label>
                                        <Textarea
                                            id="howItWorks"
                                            name="howItWorks"
                                            placeholder="Explain the workflow logic, what it does, and how it processes data..."
                                            rows={6}
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="stepByStep">Step-by-Step Instructions</Label>
                                        <Textarea
                                            id="stepByStep"
                                            name="stepByStep"
                                            placeholder="Provide detailed setup instructions, required credentials, configuration steps..."
                                            rows={8}
                                        />
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    )}

                    {/* Navigation */}
                    <div className="flex justify-between items-center pt-6 border-t">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={prevStep}
                            disabled={currentStep === 1}
                        >
                            <ChevronLeft className="w-4 h-4 mr-2" />
                            Previous
                        </Button>

                        <div className="text-sm text-muted-foreground">
                            Step {currentStep} of {steps.length}
                        </div>

                        {currentStep < steps.length ? (
                            <Button type="button" onClick={nextStep}>
                                Next
                                <ChevronRight className="w-4 h-4 ml-2" />
                            </Button>
                        ) : (
                            <FormSubmitButton>
                                Create Workflow
                            </FormSubmitButton>
                        )}
                    </div>
                </form>
            </div>
        </MainLayout>
    );
}