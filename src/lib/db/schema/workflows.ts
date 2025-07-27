import { sqliteTable, text, integer, real } from 'drizzle-orm/sqlite-core';
import { createId } from '@/lib/utils';
import { users } from './users';
import { categories } from './categories';

export const workflows = sqliteTable('workflows', {
    id: text('id').primaryKey().$defaultFn(() => createId()),
    title: text('title').notNull(),
    slug: text('slug').notNull().unique(),
    description: text('description').notNull(),
    userId: text('user_id').notNull().references(() => users.id),
    jsonUrl: text('json_url'),
    jsonContent: text('json_content'),
    isPaid: integer('is_paid', { mode: 'boolean' }).notNull().default(false),
    price: real('price'),
    paymentLinks: text('payment_links'), // JSON stored as text
    coverImage: text('cover_image'),
    posterImage: text('poster_image'),
    youtubeUrl: text('youtube_url'),
    screenshots: text('screenshots'), // JSON array of screenshot URLs
    demoImages: text('demo_images'), // JSON array of demo image URLs
    howItWorks: text('how_it_works'),
    stepByStep: text('step_by_step'),
    isPrivate: integer('is_private', { mode: 'boolean' }).notNull().default(false),
    tags: text('tags'), // JSON array stored as text
    categoryId: text('category_id').references(() => categories.id),
    createdAt: integer('created_at', { mode: 'timestamp' })
        .$defaultFn(() => new Date()),
    updatedAt: integer('updated_at', { mode: 'timestamp' })
        .$defaultFn(() => new Date()),
    viewCount: integer('view_count').notNull().default(0),
    downloadCount: integer('download_count').notNull().default(0),
});

// Collections for organizing workflows
export const collections = sqliteTable('collections', {
    id: text('id').primaryKey().$defaultFn(() => createId()),
    name: text('name').notNull(),
    description: text('description'),
    userId: text('user_id').notNull().references(() => users.id),
    isPrivate: integer('is_private', { mode: 'boolean' }).notNull().default(false),
    createdAt: integer('created_at', { mode: 'timestamp' })
        .$defaultFn(() => new Date()),
    updatedAt: integer('updated_at', { mode: 'timestamp' })
        .$defaultFn(() => new Date()),
});

// Many-to-many relationship between collections and workflows
export const collectionWorkflows = sqliteTable('collection_workflows', {
    id: text('id').primaryKey().$defaultFn(() => createId()),
    collectionId: text('collection_id').notNull().references(() => collections.id),
    workflowId: text('workflow_id').notNull().references(() => workflows.id),
    addedAt: integer('added_at', { mode: 'timestamp' })
        .$defaultFn(() => new Date()),
});

// Saved workflows (user bookmarks)
export const savedWorkflows = sqliteTable('saved_workflows', {
    id: text('id').primaryKey().$defaultFn(() => createId()),
    userId: text('user_id').notNull().references(() => users.id),
    workflowId: text('workflow_id').notNull().references(() => workflows.id),
    savedAt: integer('saved_at', { mode: 'timestamp' })
        .$defaultFn(() => new Date()),
});