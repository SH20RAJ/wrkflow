# Requirements Document

## Introduction

The N8N Workflow Marketplace (wrkflow) is a platform where users can share, discover, and monetize N8N automation workflows. The platform allows creators to list their N8N agents with detailed information, set pricing if desired, and track performance metrics. Users can browse, filter, and download workflows based on categories, connected apps, and other criteria. The platform aims to create a vibrant ecosystem for N8N workflow creators and users, with a clean, minimalistic UI and strong SEO optimization.

## Requirements

### 1. User Authentication and Management

**User Story:** As a user, I want to create an account and manage my profile so that I can publish and track my workflows.

#### Acceptance Criteria

1. WHEN a user visits the platform THEN the system SHALL allow registration and login using StackAuth.
2. WHEN a user logs in THEN the system SHALL provide access to a personalized dashboard.
3. WHEN a user accesses their profile THEN the system SHALL allow them to update their profile information.
4. WHEN a user is logged in THEN the system SHALL associate their published workflows with their account.
5. WHEN a user accesses their dashboard THEN the system SHALL display analytics for their published workflows.

### 2. Workflow Publishing and Management

**User Story:** As a creator, I want to publish and manage my N8N workflows so that I can share them with the community or sell them.

#### Acceptance Criteria

1. WHEN a creator is logged in THEN the system SHALL provide an interface to add new workflows.
2. WHEN a creator adds a workflow THEN the system SHALL require essential details (title, description, category).
3. WHEN a creator publishes a workflow THEN the system SHALL allow them to either provide a JSON URL or paste the JSON directly.
4. WHEN a creator chooses to monetize a workflow THEN the system SHALL allow them to set a price and add payment links (Cashfree, RazorPay, LemonSqueezy, GumRoad).
5. WHEN a creator edits a workflow THEN the system SHALL update all associated information.
6. WHEN a creator deletes a workflow THEN the system SHALL remove it from the marketplace.
7. WHEN a creator publishes a workflow THEN the system SHALL allow them to specify categories (AI, Sales, IT Ops, Marketing, Document Ops, Support, Other).
8. WHEN a creator publishes a workflow THEN the system SHALL allow them to optionally specify connected apps or technologies used (OpenAI, Discord, Telegram, etc.).
9. WHEN a creator publishes a workflow THEN the system SHALL allow them to add personal tags for better discoverability.
10. WHEN a creator publishes a workflow THEN the system SHALL allow them to add a cover image or poster.
11. WHEN a creator publishes a workflow THEN the system SHALL allow them to add "how it works" documentation with markdown support.
12. WHEN a creator publishes a workflow THEN the system SHALL allow them to add a step-by-step breakdown of the workflow.

### 3. Workflow Discovery and Search

**User Story:** As a user, I want to easily discover and search for workflows that meet my needs so that I can implement them in my N8N instance.

#### Acceptance Criteria

1. WHEN a user visits the marketplace THEN the system SHALL display featured and popular workflows.
2. WHEN a user searches for workflows THEN the system SHALL provide results based on titles, descriptions, and tags.
3. WHEN a user filters workflows THEN the system SHALL allow filtering by category, connected apps, and free/paid status.
4. WHEN a user sorts workflows THEN the system SHALL provide options like newest, most popular, and highest rated.
5. WHEN a user views a workflow THEN the system SHALL display all relevant details including description, pricing, and how it works.
6. WHEN a user views a workflow THEN the system SHALL show related or similar workflows.

### 4. Workflow Download and Purchase

**User Story:** As a user, I want to download free workflows or purchase paid ones so that I can use them in my N8N instance.

#### Acceptance Criteria

1. WHEN a user selects a free workflow THEN the system SHALL allow direct download of the JSON file.
2. WHEN a user selects a paid workflow THEN the system SHALL redirect to the specified payment gateway.
3. WHEN a user downloads a workflow THEN the system SHALL increment the download count for analytics.
4. WHEN a user clicks on a workflow THEN the system SHALL increment the view count for analytics.

### 5. Analytics and Tracking

**User Story:** As a creator, I want to track the performance of my published workflows so that I can understand user engagement.

#### Acceptance Criteria

1. WHEN a creator views their dashboard THEN the system SHALL display view counts for each workflow.
2. WHEN a creator views their dashboard THEN the system SHALL display download/purchase counts for each workflow.
3. WHEN a creator views analytics THEN the system SHALL provide trends over time for views and downloads.
4. WHEN a creator views analytics THEN the system SHALL show conversion rates for paid workflows.

### 6. SEO and Performance

**User Story:** As a platform owner, I want the website to be optimized for search engines and performance so that it can attract more users.

#### Acceptance Criteria

1. WHEN a search engine crawls the website THEN the system SHALL provide optimized metadata for all pages.
2. WHEN a user accesses the website THEN the system SHALL load quickly and efficiently.
3. WHEN a user navigates the website THEN the system SHALL provide a responsive experience across all device types.
4. WHEN a search engine indexes the website THEN the system SHALL have proper structured data for workflows.

### 7. UI/UX Design

**User Story:** As a user, I want a clean, minimalistic, and well-organized interface so that I can easily navigate and use the platform.

#### Acceptance Criteria

1. WHEN a user interacts with the UI THEN the system SHALL use consistent design patterns from shadcn components.
2. WHEN the website is styled THEN the system SHALL use CSS variables defined in global.css for theming.
3. WHEN a user views the website THEN the system SHALL present a clean, minimalistic design that prioritizes content.
4. WHEN a user navigates the website THEN the system SHALL provide intuitive navigation and clear call-to-action elements.
5. WHEN a user views workflow details THEN the system SHALL present information in a structured and easily digestible format.

### 8. Database and ORM

**User Story:** As a developer, I want to use Drizzle ORM with Turso SQLite DB so that data management is efficient and scalable.

#### Acceptance Criteria

1. WHEN the application needs to store or retrieve data THEN the system SHALL use Drizzle ORM for database operations.
2. WHEN the database schema changes THEN the system SHALL use Drizzle migrations to manage schema evolution.
3. WHEN data is queried THEN the system SHALL optimize queries for performance.
4. WHEN the application stores sensitive data THEN the system SHALL ensure proper security measures are in place.

### 9. Community Features

**User Story:** As a user, I want to engage with the community around workflows so that I can get help and share feedback.

#### Acceptance Criteria

1. WHEN a user views a workflow THEN the system SHALL allow them to leave comments or questions.
2. WHEN a user uses a workflow THEN the system SHALL allow them to rate and review it.
3. WHEN a creator receives comments THEN the system SHALL notify them and allow them to respond.
4. WHEN a user finds a helpful workflow THEN the system SHALL allow them to share it on social media.