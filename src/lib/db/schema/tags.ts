import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';
import { createId } from '@/lib/utils';
import { workflows } from './workflows';

export const tags = sqliteTable('tags', {
    id: text('id').primaryKey().$defaultFn(() => createId()),
    name: text('name').notNull().unique(),
    slug: text('slug').notNull().unique(),
    createdAt: integer('created_at', { mode: 'timestamp' })
        .$defaultFn(() => new Date()),
});

// Junction table for workflows and tags (many-to-many)
export const workflowsToTags = sqliteTable('workflows_to_tags', {
    id: text('id').primaryKey().$defaultFn(() => createId()),
    workflowId: text('workflow_id').notNull().references(() => workflows.id, { onDelete: 'cascade' }),
    tagId: text('tag_id').notNull().references(() => tags.id, { onDelete: 'cascade' }),
    createdAt: integer('created_at', { mode: 'timestamp' })
        .$defaultFn(() => new Date()),
});