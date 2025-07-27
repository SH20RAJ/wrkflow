import { uniqueNamesGenerator, Config, adjectives, colors, animals } from 'unique-names-generator';
import { getDB } from '@/lib/db';
import { workflows } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';

const config: Config = {
    dictionaries: [adjectives, colors, animals],
    separator: '-',
    length: 3,
    style: 'lowerCase',
};

/**
 * Generate a unique slug from a title
 */
export function generateSlugFromTitle(title: string): string {
    return title
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
        .replace(/\s+/g, '-') // Replace spaces with hyphens
        .replace(/-+/g, '-') // Replace multiple hyphens with single
        .replace(/^-|-$/g, ''); // Remove leading/trailing hyphens
}

/**
 * Generate a random unique slug using unique-names-generator
 */
export function generateRandomSlug(): string {
    return uniqueNamesGenerator(config);
}

/**
 * Check if a slug is available
 */
export async function isSlugAvailable(slug: string, excludeId?: string): Promise<boolean> {
    if (!slug || slug.length < 3) return false;

    const db = getDB();
    const existing = await db
        .select({ id: workflows.id })
        .from(workflows)
        .where(eq(workflows.slug, slug))
        .limit(1);

    // If no existing workflow found, slug is available
    if (!existing.length) return true;

    // If we're updating an existing workflow, check if it's the same one
    if (excludeId && existing[0].id === excludeId) return true;

    return false;
}

/**
 * Generate a unique slug, trying title-based first, then random
 */
export async function generateUniqueSlug(title: string, excludeId?: string): Promise<string> {
    // First try title-based slug
    let baseSlug = generateSlugFromTitle(title);

    if (await isSlugAvailable(baseSlug, excludeId)) {
        return baseSlug;
    }

    // Try with numbers appended
    for (let i = 1; i <= 10; i++) {
        const numberedSlug = `${baseSlug}-${i}`;
        if (await isSlugAvailable(numberedSlug, excludeId)) {
            return numberedSlug;
        }
    }

    // Fall back to random slug generation
    let attempts = 0;
    while (attempts < 10) {
        const randomSlug = generateRandomSlug();
        if (await isSlugAvailable(randomSlug, excludeId)) {
            return randomSlug;
        }
        attempts++;
    }

    // Final fallback with timestamp
    const timestampSlug = `${baseSlug}-${Date.now()}`;
    return timestampSlug;
}

/**
 * Validate slug format
 */
export function validateSlug(slug: string): { isValid: boolean; error?: string } {
    if (!slug) {
        return { isValid: false, error: 'Slug is required' };
    }

    if (slug.length < 3) {
        return { isValid: false, error: 'Slug must be at least 3 characters long' };
    }

    if (slug.length > 100) {
        return { isValid: false, error: 'Slug must be less than 100 characters long' };
    }

    if (!/^[a-z0-9-]+$/.test(slug)) {
        return { isValid: false, error: 'Slug can only contain lowercase letters, numbers, and hyphens' };
    }

    if (slug.startsWith('-') || slug.endsWith('-')) {
        return { isValid: false, error: 'Slug cannot start or end with a hyphen' };
    }

    if (slug.includes('--')) {
        return { isValid: false, error: 'Slug cannot contain consecutive hyphens' };
    }

    // Reserved slugs
    const reserved = ['api', 'admin', 'www', 'mail', 'ftp', 'new', 'edit', 'delete', 'create', 'update'];
    if (reserved.includes(slug)) {
        return { isValid: false, error: 'This slug is reserved and cannot be used' };
    }

    return { isValid: true };
}