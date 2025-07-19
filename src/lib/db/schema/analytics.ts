import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';
import { createId } from '@/lib/utils';
import { workflows } from './workflows';
import { users } from './users';

export const analytics = sqliteTable('analytics', {
    id: text('id').primaryKey().$defaultFn(() => createId()),
    workflowId: text('workflow_id').notNull().references(() => workflows.id, { onDelete: 'cascade' }),
    userId: text('user_id').references(() => users.id),
    eventType: text('event_type').notNull(), // view, download, etc.
    metadata: text('metadata'), // JSON stored as text
    createdAt: integer('created_at', { mode: 'timestamp' })
        .$defaultFn(() => new Date()),
    userAgent: text('user_agent'),
    ipAddress: text('ip_address'),
});