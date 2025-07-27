'use client';

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Download, Star, Share, Edit } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

interface WorkflowActionsProps {
    workflowId: string;
    isPaid: boolean;
    price: number | null;
    canEdit: boolean;
    jsonContent: string | null;
    title: string;
}

export function WorkflowActions({
    workflowId,
    isPaid,
    price,
    canEdit,
    jsonContent,
    title
}: WorkflowActionsProps) {
    const [isSaved, setIsSaved] = useState(false);
    const [isDownloading, setIsDownloading] = useState(false);

    const handleDownload = async () => {
        if (!jsonContent) {
            toast.error("No workflow content available for download");
            return;
        }

        setIsDownloading(true);
        try {
            // Create a blob with the JSON content
            const blob = new Blob([jsonContent], { type: 'application/json' });
            const url = URL.createObjectURL(blob);

            // Create a temporary link and trigger download
            const link = document.createElement('a');
            link.href = url;
            link.download = `${title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}_workflow.json`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            // Clean up the URL
            URL.revokeObjectURL(url);

            // Update download count (optional - you might want to call an API endpoint)
            await fetch(`/api/workflows/${workflowId}/download`, {
                method: 'POST',
            });

            toast.success("Workflow downloaded successfully!");
        } catch (error) {
            console.error('Download error:', error);
            toast.error("Failed to download workflow");
        } finally {
            setIsDownloading(false);
        }
    };

    const handleSave = async () => {
        try {
            // Toggle saved state
            const newSavedState = !isSaved;
            setIsSaved(newSavedState);

            // Here you would typically call an API to save/unsave the workflow
            // For now, we'll just show a toast
            if (newSavedState) {
                toast.success("Workflow saved to your collection!");
            } else {
                toast.success("Workflow removed from your collection");
            }

            // TODO: Implement actual save/unsave API call
            // await fetch(`/api/workflows/${workflowId}/save`, {
            //     method: newSavedState ? 'POST' : 'DELETE',
            // });
        } catch (error) {
            console.error('Save error:', error);
            toast.error("Failed to save workflow");
            // Revert the state on error
            setIsSaved(!isSaved);
        }
    };

    const handleShare = async () => {
        try {
            const url = `${window.location.origin}/workflows/${workflowId}`;

            if (navigator.share) {
                // Use native share API if available
                await navigator.share({
                    title: title,
                    text: `Check out this N8N workflow: ${title}`,
                    url: url,
                });
                toast.success("Workflow shared successfully!");
            } else {
                // Fallback to clipboard
                await navigator.clipboard.writeText(url);
                toast.success("Workflow link copied to clipboard!");
            }
        } catch (error) {
            console.error('Share error:', error);
            // Fallback: try to copy to clipboard
            try {
                const url = `${window.location.origin}/workflows/${workflowId}`;
                await navigator.clipboard.writeText(url);
                toast.success("Workflow link copied to clipboard!");
            } catch (clipboardError) {
                toast.error("Failed to share workflow");
            }
        }
    };

    const handlePurchase = () => {
        // TODO: Implement payment flow
        toast.info("Payment integration coming soon!");
    };

    return (
        <div className="space-y-4">
            {isPaid ? (
                <div className="text-center">
                    <div className="text-3xl font-bold text-green-600 mb-2">
                        ${price}
                    </div>
                    <Button className="w-full" size="lg" onClick={handlePurchase}>
                        Purchase Workflow
                    </Button>
                </div>
            ) : (
                <Button
                    className="w-full"
                    size="lg"
                    onClick={handleDownload}
                    disabled={isDownloading}
                >
                    <Download className="mr-2 h-4 w-4" />
                    {isDownloading ? "Downloading..." : "Download Free"}
                </Button>
            )}

            {canEdit && (
                <Button variant="outline" size="sm" className="w-full" asChild>
                    <Link href={`/workflows/${workflowId}/edit`}>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit Workflow
                    </Link>
                </Button>
            )}

            <div className="flex gap-2">
                <Button
                    variant="outline"
                    size="sm"
                    className="flex-1"
                    onClick={handleSave}
                >
                    <Star className={`mr-2 h-4 w-4 ${isSaved ? 'fill-current text-yellow-500' : ''}`} />
                    {isSaved ? 'Saved' : 'Save'}
                </Button>
                <Button
                    variant="outline"
                    size="sm"
                    className="flex-1"
                    onClick={handleShare}
                >
                    <Share className="mr-2 h-4 w-4" />
                    Share
                </Button>
            </div>
        </div>
    );
}