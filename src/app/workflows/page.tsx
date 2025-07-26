import type { Metadata } from 'next';
import WorkflowsPageClient from './page-client';

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

export default function WorkflowsPage() {
    return <WorkflowsPageClient />;
}