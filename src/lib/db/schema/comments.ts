import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';
import { createId } from '@/lib/utils';
import { workflows } from './workflows';
import { users } from './users';

export const comments = sqliteTable('comments', {
    id: text('id').primaryKey().$defaultFn(() => createId()),
    workflowId: text('workflow_id').notNull().references(() => workflows.id, { onDelete: 'cascade' }),
    userId: text('user_id').notNull().references(() => users.id),
    content: text('content').notNull(),
    parentId: text('parent_id').references(() => comments.id),
    createdAt: integer('created_at', { mode: 'timestamp' })
        .$defaultFn(() => new Date()),
    updatedAt: integer('updated_at', { mode: 'timestamp' })
        .$defaultFn(() => new Date()),
});