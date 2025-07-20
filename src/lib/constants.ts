// Application information
export const APP_NAME = "wrkflow";
export const APP_DESCRIPTION = "Discover, share, and monetize N8N automation workflows with our powerful marketplace platform";

// Site configuration
export const SITE_CONFIG = {
    title: "Wrkflow - N8N Workflow Marketplace | Automation Made Easy",
    description: "Discover, share, and monetize professional N8N workflows. Join thousands of automation experts building the future of business automation. Free and premium workflows available.",
    url: "https://wrkflow.skechflow.space",
    ogImage: "/og-image.png",
    keywords: [
        "n8n workflows",
        "automation marketplace", 
        "business automation",
        "workflow templates",
        "n8n integrations",
        "automation tools",
        "workflow automation",
        "no-code automation",
        "process automation",
        "integration platform"
    ],
    links: {
        twitter: "https://twitter.com/wrkflow_io",
        github: "https://github.com/wrkflow/wrkflow"
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