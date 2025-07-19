// Application information
export const APP_NAME = "n8n Workflow Marketplace";
export const APP_DESCRIPTION = "Discover, share, and use n8n workflows created by the community";

// Site configuration
export const SITE_CONFIG = {
    title: APP_NAME,
    description: APP_DESCRIPTION,
    url: "https://wrkflow.io",
    ogImage: "/og-image.png",
    links: {
        twitter: "https://twitter.com/n8n_io",
        github: "https://github.com/n8n-io/n8n"
    }
};

// Database related constants
export const DB_CONSTANTS = {
    MAX_TITLE_LENGTH: 100,
    MAX_DESCRIPTION_LENGTH: 500,
    MAX_REVIEW_LENGTH: 1000,
    MAX_COMMENT_LENGTH: 1000,
    MAX_BIO_LENGTH: 500,
    MIN_RATING: 1,
    MAX_RATING: 5,
};

// Pagination constants
export const PAGINATION = {
    DEFAULT_PAGE_SIZE: 10,
    MAX_PAGE_SIZE: 50,
};

// Event types for analytics
export const EVENT_TYPES = {
    VIEW: 'view',
    DOWNLOAD: 'download',
    SHARE: 'share',
    PURCHASE: 'purchase',
};