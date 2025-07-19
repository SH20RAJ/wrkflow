import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';
import { createId } from '@/lib/utils';
import { workflows } from './workflows';

export const technologies = sqliteTable('technologies', {
    id: text('id').primaryKey().$defaultFn(() => createId()),
    name: text('name').notNull().unique(),
    description: text('description'),
    slug: text('slug').notNull().unique(),
    icon: text('icon'),
    createdAt: integer('created_at', { mode: 'timestamp' })
        .$defaultFn(() => new Date()),
    updatedAt: integer('updated_at', { mode: 'timestamp' })
        .$defaultFn(() => new Date()),
});

// Junction table for workflows and technologies (many-to-many)
export const workflowsToTechnologies = sqliteTable('workflows_to_technologies', {
    id: text('id').primaryKey().$defaultFn(() => createId()),
    workflowId: text('workflow_id').notNull().references(() => workflows.id, { onDelete: 'cascade' }),
    technologyId: text('technology_id').notNull().references(() => technologies.id, { onDelete: 'cascade' }),
    createdAt: integer('created_at', { mode: 'timestamp' })
        .$defaultFn(() => new Date()),
});