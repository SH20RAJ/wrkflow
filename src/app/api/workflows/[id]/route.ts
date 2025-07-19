import { NextRequest, NextResponse } from "next/server";

/**
 * GET /api/workflows/[id]
 * Retrieves a specific workflow by ID
 */
export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;

        // Mock response - will be replaced with actual database query
        const workflow = {
            id,
            title: `Sample Workflow ${id}`,
            description: `This is a detailed description for workflow ${id}. It includes information about what the workflow does, how it works, and what technologies it uses.`,
            longDescription: `# Workflow Description\n\nThis workflow automates the process of gathering data from multiple sources, processing it, and sending notifications to relevant channels.\n\n## Features\n\n- Data collection from multiple APIs\n- Automated processing and filtering\n- Notification delivery to Slack and email\n- Scheduled execution\n\n## Requirements\n\n- N8N version 0.170.0 or higher\n- API keys for integrated services`,
            category: "marketing",
            technologies: ["openai", "slack", "github"],
            author: {
                id: "user-1",
                name: "John Doe",
                avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
            },
            price: 1500, // Price in cents
            createdAt: new Date(Date.now() - 7 * 86400000).toISOString(), // 7 days ago
            updatedAt: new Date(Date.now() - 2 * 86400000).toISOString(), // 2 days ago
            downloads: 120,
            rating: 4.5,
            reviews: [
                {
                    id: "review-1",
                    userId: "user-2",
                    userName: "Jane Smith",
                    rating: 5,
                    comment: "This workflow saved me hours of manual work!",
                    createdAt: new Date(Date.now() - 5 * 86400000).toISOString(),
                },
                {
                    id: "review-2",
                    userId: "user-3",
                    userName: "Bob Johnson",
                    rating: 4,
                    comment: "Great workflow, but could use better documentation.",
                    createdAt: new Date(Date.now() - 3 * 86400000).toISOString(),
                },
            ],
            version: "1.2.0",
            compatibleN8nVersions: ">=0.170.0",
            previewImages: [
                "https://via.placeholder.com/800x450?text=Workflow+Preview+1",
                "https://via.placeholder.com/800x450?text=Workflow+Preview+2",
            ],
        };

        return NextResponse.json(workflow);
    } catch (error) {
        console.error(`Error fetching workflow:`, error);
        return NextResponse.json(
            { error: "Failed to fetch workflow" },
            { status: 500 }
        );
    }
}

/**
 * PUT /api/workflows/[id]
 * Updates a specific workflow by ID
 */
export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const body = await request.json() as Record<string, unknown>;

        // Validate request body
        if (!body.title && !body.description && !body.category) {
            return NextResponse.json(
                { error: "No valid fields to update" },
                { status: 400 }
            );
        }

        // Mock response - will be replaced with actual database update
        const updatedWorkflow = {
            id,
            ...body,
            updatedAt: new Date().toISOString(),
        };

        return NextResponse.json(updatedWorkflow);
    } catch (error) {
        console.error(`Error updating workflow:`, error);
        return NextResponse.json(
            { error: "Failed to update workflow" },
            { status: 500 }
        );
    }
}

/**
 * DELETE /api/workflows/[id]
 * Deletes a specific workflow by ID
 */
export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;

        // Mock response - will be replaced with actual database deletion
        return NextResponse.json({ success: true, deletedId: id });
    } catch (error) {
        console.error(`Error deleting workflow:`, error);
        return NextResponse.json(
            { error: "Failed to delete workflow" },
            { status: 500 }
        );
    }
}