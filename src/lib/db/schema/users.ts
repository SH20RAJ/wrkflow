import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';
import { createId } from '@/lib/utils';

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