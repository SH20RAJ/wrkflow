import { getDb } from '@/lib/db';
import * as schema from '@/lib/db/schema';
import { eq } from 'drizzle-orm';

/**
 * Utility functions for common database operations
 */

/**
 * Get a workflow by ID
 */
export async function getWorkflowById(id: string) {
    const db = getDb();
    const [workflow] = await db
        .select()
        .from(schema.workflows)
        .where(eq(schema.workflows.id, id))
        .limit(1);

    return workflow;
}

/**
 * Get workflows with pagination
 */
export async function getWorkflows(page: number = 1, pageSize: number = 10) {
    const db = getDb();
    const offset = (page - 1) * pageSize;

    const workflows = await db
        .select()
        .from(schema.workflows)
        .limit(pageSize)
        .offset(offset)
        .orderBy(schema.workflows.createdAt);

    const [{ count }] = await db
        .select({ count: db.fn.count() })
        .from(schema.workflows) as [{ count: number }];

    return {
        workflows,
        pagination: {
            total: count,
            page,
            pageSize,
            pageCount: Math.ceil(count / pageSize),
        }
    };
}

/**
 * Get a user by ID
 */
export async function getUserById(id: string) {
    const db = getDb();
    const [user] = await db
        .select()
        .from(schema.users)
        .where(eq(schema.users.id, id))
        .limit(1);

    return user;
}

/**
 * Get a user by email
 */
export async function getUserByEmail(email: string) {
    const db = getDb();
    const [user] = await db
        .select()
        .from(schema.users)
        .where(eq(schema.users.email, email))
        .limit(1);

    return user;
}

/**
 * Track an analytics event
 */
export async function trackEvent(data: {
    workflowId: string;
    userId?: string;
    eventType: string;
    metadata?: Record<string, any>;
    userAgent?: string;
    ipAddress?: string;
}) {
    const db = getDb();

    const [result] = await db
        .insert(schema.analytics)
        .values({
            workflowId: data.workflowId,
            userId: data.userId,
            eventType: data.eventType,
            metadata: data.metadata ? JSON.stringify(data.metadata) : undefined,
            userAgent: data.userAgent,
            ipAddress: data.ipAddress,
        })
        .returning();

    return result;
}