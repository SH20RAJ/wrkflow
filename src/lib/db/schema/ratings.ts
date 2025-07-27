import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';
import { createId } from '@/lib/utils';
import { workflows } from './workflows';
import { users } from './users';

export const ratings = sqliteTable('ratings', {
    id: text('id').primaryKey().$defaultFn(() => createId()),
    rating: integer('rating').notNull(), // 1-5 stars
    review: text('review'),
    userId: text('user_id').notNull().references(() => users.id),
    workflowId: text('workflow_id').notNull().references(() => workflows.id, { onDelete: 'cascade' }),
    createdAt: integer('created_at', { mode: 'timestamp' })
        .$defaultFn(() => new Date()),
    updatedAt: integer('updated_at', { mode: 'timestamp' })
        .$defaultFn(() => new Date()),
});