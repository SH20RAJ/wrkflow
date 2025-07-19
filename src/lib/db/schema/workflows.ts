import { sqliteTable, text, integer, real } from 'drizzle-orm/sqlite-core';
import { createId } from '@/lib/utils';
import { users } from './users';

export const workflows = sqliteTable('workflows', {
    id: text('id').primaryKey().$defaultFn(() => createId()),
    title: text('title').notNull(),
    description: text('description').notNull(),
    userId: text('user_id').notNull().references(() => users.id),
    jsonUrl: text('json_url'),
    jsonContent: text('json_content'),
    isPaid: integer('is_paid', { mode: 'boolean' }).notNull().default(false),
    price: real('price'),
    paymentLinks: text('payment_links'), // JSON stored as text
    coverImage: text('cover_image'),
    howItWorks: text('how_it_works'),
    stepByStep: text('step_by_step'),
    createdAt: integer('created_at', { mode: 'timestamp' })
        .$defaultFn(() => new Date()),
    updatedAt: integer('updated_at', { mode: 'timestamp' })
        .$defaultFn(() => new Date()),
    viewCount: integer('view_count').notNull().default(0),
    downloadCount: integer('download_count').notNull().default(0),
});