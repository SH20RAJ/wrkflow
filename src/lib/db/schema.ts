import { sqliteTable, text, integer, real } from "drizzle-orm/sqlite-core";
import { createId } from '@/lib/utils';

// Users table
export const users = sqliteTable('users', {
    id: text('id').primaryKey().$defaultFn(() => createId()),
    email: text('email').notNull().unique(),
    name: text('name'),
    avatar: text('avatar'),
    bio: text('bio'),
    createdAt: integer('created_at', { mode: 'timestamp' })
        .$defaultFn(() => new Date()),
    updatedAt: integer('updated_at', { mode: 'timestamp' })
        .$defaultFn(() => new Date()),
});

// Categories table
export const categories = sqliteTable('categories', {
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

// Technologies table
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

// Workflows table
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

// Junction tables
export const workflowsToCategories = sqliteTable('workflows_to_categories', {
    id: text('id').primaryKey().$defaultFn(() => createId()),
    workflowId: text('workflow_id').notNull().references(() => workflows.id, { onDelete: 'cascade' }),
    categoryId: text('category_id').notNull().references(() => categories.id, { onDelete: 'cascade' }),
    createdAt: integer('created_at', { mode: 'timestamp' })
        .$defaultFn(() => new Date()),
});

export const workflowsToTechnologies = sqliteTable('workflows_to_technologies', {
    id: text('id').primaryKey().$defaultFn(() => createId()),
    workflowId: text('workflow_id').notNull().references(() => workflows.id, { onDelete: 'cascade' }),
    technologyId: text('technology_id').notNull().references(() => technologies.id, { onDelete: 'cascade' }),
    createdAt: integer('created_at', { mode: 'timestamp' })
        .$defaultFn(() => new Date()),
});

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

// Tags table
export const tags = sqliteTable('tags', {
    id: text('id').primaryKey().$defaultFn(() => createId()),
    name: text('name').notNull().unique(),
    createdAt: integer('created_at', { mode: 'timestamp' })
        .$defaultFn(() => new Date()),
});

// Workflow tags (many-to-many)
export const workflowTags = sqliteTable('workflow_tags', {
    id: text('id').primaryKey().$defaultFn(() => createId()),
    workflowId: text('workflow_id').notNull().references(() => workflows.id, { onDelete: 'cascade' }),
    tagId: text('tag_id').notNull().references(() => tags.id, { onDelete: 'cascade' }),
    createdAt: integer('created_at', { mode: 'timestamp' })
        .$defaultFn(() => new Date()),
});

// Comments table
export const comments = sqliteTable('comments', {
    id: text('id').primaryKey().$defaultFn(() => createId()),
    content: text('content').notNull(),
    userId: text('user_id').notNull().references(() => users.id),
    workflowId: text('workflow_id').notNull().references(() => workflows.id, { onDelete: 'cascade' }),
    parentId: text('parent_id'), // For nested comments - will reference comments.id
    createdAt: integer('created_at', { mode: 'timestamp' })
        .$defaultFn(() => new Date()),
    updatedAt: integer('updated_at', { mode: 'timestamp' })
        .$defaultFn(() => new Date()),
});

// Ratings table
export const ratings = sqliteTable('ratings', {
    id: text('id').primaryKey().$defaultFn(() => createId()),
    rating: integer('rating').notNull(), // 1-5 scale
    review: text('review'),
    userId: text('user_id').notNull().references(() => users.id),
    workflowId: text('workflow_id').notNull().references(() => workflows.id, { onDelete: 'cascade' }),
    createdAt: integer('created_at', { mode: 'timestamp' })
        .$defaultFn(() => new Date()),
    updatedAt: integer('updated_at', { mode: 'timestamp' })
        .$defaultFn(() => new Date()),
});

// Analytics table
export const analytics = sqliteTable('analytics', {
    id: text('id').primaryKey().$defaultFn(() => createId()),
    workflowId: text('workflow_id').notNull().references(() => workflows.id, { onDelete: 'cascade' }),
    userId: text('user_id').references(() => users.id), // Can be null for anonymous views
    action: text('action').notNull(), // 'view', 'download', 'share', etc.
    metadata: text('metadata'), // JSON string for additional data
    ipAddress: text('ip_address'),
    userAgent: text('user_agent'),
    createdAt: integer('created_at', { mode: 'timestamp' })
        .$defaultFn(() => new Date()),
});
