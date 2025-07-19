import { NextRequest, NextResponse } from "next/server";

/**
 * GET /api/workflows
 * Retrieves a list of workflows with optional filtering and pagination
 */
export async function GET(request: NextRequest) {
    try {
        // Get query parameters
        const searchParams = request.nextUrl.searchParams;
        const page = parseInt(searchParams.get("page") || "1");
        const limit = parseInt(searchParams.get("limit") || "12");
        const category = searchParams.get("category");
        const technology = searchParams.get("technology");
        const search = searchParams.get("search");
        const sort = searchParams.get("sort") || "newest";

        // Mock response for now - will be replaced with actual database queries
        const mockWorkflows = Array.from({ length: 12 }, (_, i) => ({
            id: `workflow-${i + 1}`,
            title: `Sample Workflow ${i + 1}`,
            description: `This is a sample workflow description for workflow ${i + 1}`,
            category: ["ai", "marketing", "sales"][i % 3],
            technologies: ["openai", "slack", "github"],
            author: {
                id: `user-${i % 5 + 1}`,
                name: `User ${i % 5 + 1}`,
            },
            price: i % 3 === 0 ? 0 : (i % 5 + 1) * 500, // Price in cents
            createdAt: new Date(Date.now() - i * 86400000).toISOString(), // Days ago
            updatedAt: new Date(Date.now() - i * 43200000).toISOString(), // Half days ago
            downloads: i * 10 + 5,
            rating: 3 + (i % 3),
        }));

        return NextResponse.json({
            workflows: mockWorkflows,
            pagination: {
                page,
                limit,
                total: 50, // Mock total count
                totalPages: Math.ceil(50 / limit),
            },
        });
    } catch (error) {
        console.error("Error fetching workflows:", error);
        return NextResponse.json(
            { error: "Failed to fetch workflows" },
            { status: 500 }
        );
    }
}

/**
 * POST /api/workflows
 * Creates a new workflow
 */
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        // Validate request body
        if (!body.title || !body.description || !body.category) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            );
        }

        // Mock response - will be replaced with actual database operations
        const newWorkflow = {
            id: `workflow-${Date.now()}`,
            ...body,
            author: {
                id: "current-user-id",
                name: "Current User",
            },
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            downloads: 0,
            rating: 0,
        };

        return NextResponse.json(newWorkflow, { status: 201 });
    } catch (error) {
        console.error("Error creating workflow:", error);
        return NextResponse.json(
            { error: "Failed to create workflow" },
            { status: 500 }
        );
    }
}