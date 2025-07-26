# API Documentation

## 🔌 API Overview

wrkflow provides a comprehensive RESTful API built with Next.js API routes, enabling all marketplace functionality through clean, consistent endpoints. The API follows REST principles and provides JSON responses with consistent error handling.

## 🌐 Base URL

- **Development**: `http://localhost:3001/api`
- **Production**: `https://wrkflow.sketchflow.space/api` (when deployed)

## 🔐 Authentication

### Authentication Method
The API uses **StackAuth** for user authentication with session-based tokens stored in HTTP-only cookies.

### Protected Endpoints
Protected endpoints require valid authentication. Unauthenticated requests return:

```json
{
  "success": false,
  "error": "Authentication required",
  "statusCode": 401
}
```

### Authentication Headers
```http
Cookie: stack-session=<session-token>
```

## 📝 Standard Response Format

All API endpoints follow a consistent response format:

### Success Response
```typescript
interface SuccessResponse<T> {
  success: true;
  data?: T;
  message?: string;
  pagination?: PaginationInfo;
}
```

### Error Response
```typescript
interface ErrorResponse {
  success: false;
  error: string;
  statusCode: number;
  details?: any;
}
```

### Pagination Info
```typescript
interface PaginationInfo {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}
```

## 🔄 Workflows API

### GET /api/workflows

**Description**: Retrieve workflows with filtering, searching, and pagination

**Method**: `GET`

**Query Parameters**:
```typescript
interface WorkflowsQuery {
  search?: string;        // Search in title, description, tags
  category?: string;      // Filter by category ID or 'all'
  price?: 'free' | 'paid' | 'all';  // Filter by price type
  sort?: 'newest' | 'oldest' | 'popular' | 'downloads';
  page?: number;          // Page number (default: 1)
  limit?: number;         // Items per page (default: 12, max: 50)
  featured?: boolean;     // Include featured workflows
}
```

**Example Request**:
```http
GET /api/workflows?search=automation&category=marketing&price=free&sort=popular&page=1&limit=12
```

**Response**:
```typescript
interface WorkflowsResponse {
  success: true;
  workflows: WorkflowSummary[];
  featured?: WorkflowSummary[];
  pagination: PaginationInfo;
  stats: {
    totalWorkflows: number;
    totalDownloads: number;
    freeWorkflows: number;
  };
}

interface WorkflowSummary {
  id: string;
  title: string;
  description: string;
  isPaid: boolean;
  price: number | null;
  viewCount: number;
  downloadCount: number;
  createdAt: string;
  coverImage: string | null;
  posterImage: string | null;
  tags: string[] | null;
  categoryId: string | null;
  userName: string;
  userEmail: string;
  userAvatar: string | null;
}
```

**Example Response**:
```json
{
  "success": true,
  "workflows": [
    {
      "id": "workflow-123",
      "title": "Automated Email Marketing Campaign",
      "description": "Complete email automation workflow with segmentation",
      "isPaid": false,
      "price": null,
      "viewCount": 156,
      "downloadCount": 42,
      "createdAt": "2025-07-20T10:30:00Z",
      "coverImage": "https://example.com/cover.jpg",
      "posterImage": null,
      "tags": ["email", "marketing", "automation"],
      "categoryId": "marketing-001",
      "userName": "John Doe",
      "userEmail": "john@example.com",
      "userAvatar": "https://avatar.com/john.jpg"
    }
  ],
  "featured": [...],
  "pagination": {
    "page": 1,
    "limit": 12,
    "total": 156,
    "totalPages": 13,
    "hasNext": true,
    "hasPrev": false
  },
  "stats": {
    "totalWorkflows": 156,
    "totalDownloads": 2841,
    "freeWorkflows": 134
  }
}
```

### POST /api/workflows

**Description**: Create a new workflow

**Method**: `POST`

**Authentication**: Required

**Content-Type**: `multipart/form-data`

**Form Fields**:
```typescript
interface CreateWorkflowData {
  title: string;                    // Required
  description: string;              // Required
  coverImage?: string;              // Image URL
  posterImage?: string;             // Image URL
  youtubeUrl?: string;              // YouTube video URL
  screenshots?: string;             // JSON array of URLs
  demoImages?: string;              // JSON array of URLs
  jsonContent?: string;             // N8N workflow JSON
  jsonUrl?: string;                 // External JSON URL
  isPaid: boolean;                  // Required
  isPrivate: boolean;               // Required
  price?: number;                   // Required if isPaid=true
  categoryId?: string;              // Category ID
  tags?: string;                    // JSON array of tags
  howItWorks?: string;              // Markdown content
  stepByStep?: string;              // Markdown content
  userId: string;                   // Required (from auth)
}
```

**Example Request**:
```http
POST /api/workflows
Content-Type: multipart/form-data

title=My Awesome Workflow
description=This workflow automates everything
jsonContent={"nodes":[],"connections":[]}
isPaid=false
isPrivate=false
tags=["automation","ai"]
userId=user-123
```

**Response**:
```typescript
interface CreateWorkflowResponse {
  success: true;
  workflow: {
    id: string;
    title: string;
    description: string;
    // ... other workflow fields
  };
  message: string;
}
```

**Example Response**:
```json
{
  "success": true,
  "workflow": {
    "id": "workflow-456",
    "title": "My Awesome Workflow",
    "description": "This workflow automates everything",
    "isPaid": false,
    "createdAt": "2025-07-25T14:30:00Z"
  },
  "message": "Workflow created successfully"
}
```

### GET /api/workflows/[id]

**Description**: Get detailed information about a specific workflow

**Method**: `GET`

**Path Parameters**:
- `id`: Workflow ID

**Example Request**:
```http
GET /api/workflows/workflow-123
```

**Response**:
```typescript
interface WorkflowDetailResponse {
  success: true;
  workflow: WorkflowDetail;
}

interface WorkflowDetail {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  category: string;
  tags: string[];
  technologies: string[];
  author: {
    id: string;
    name: string;
    avatar: string;
  };
  price: number;
  createdAt: string;
  updatedAt: string;
  downloads: number;
  views: number;
  rating: number;
  reviews: Review[];
  version: string;
  compatibleN8nVersions: string;
  previewImages: string[];
  jsonContent?: string;
  jsonUrl?: string;
}
```

### PUT /api/workflows/[id]

**Description**: Update a specific workflow (owner only)

**Method**: `PUT`

**Authentication**: Required (must be workflow owner)

**Content-Type**: `application/json`

**Request Body**:
```typescript
interface UpdateWorkflowData {
  title?: string;
  description?: string;
  category?: string;
  tags?: string[];
  isPrivate?: boolean;
  // ... other updatable fields
}
```

### DELETE /api/workflows/[id]

**Description**: Delete a specific workflow (owner only)

**Method**: `DELETE`

**Authentication**: Required (must be workflow owner)

**Response**:
```json
{
  "success": true,
  "deletedId": "workflow-123"
}
```

## 🏷️ Categories API

### GET /api/categories

**Description**: Get all workflow categories

**Method**: `GET`

**Response**:
```typescript
interface CategoriesResponse {
  success: true;
  categories: Category[];
}

interface Category {
  id: string;
  name: string;
  description: string;
  slug: string;
  icon: string;
  workflowCount: number;
}
```

**Example Response**:
```json
{
  "success": true,
  "categories": [
    {
      "id": "marketing-001",
      "name": "Marketing Automation",
      "description": "Email campaigns, social media, and lead generation",
      "slug": "marketing-automation",
      "icon": "📧",
      "workflowCount": 45
    },
    {
      "id": "sales-002",
      "name": "Sales Processes",
      "description": "CRM automation, lead qualification, and follow-ups",
      "slug": "sales-processes",
      "icon": "💼",
      "workflowCount": 32
    }
  ]
}
```

### POST /api/categories

**Description**: Create a new category (admin only)

**Method**: `POST`

**Authentication**: Required (admin)

**Content-Type**: `application/json`

**Request Body**:
```typescript
interface CreateCategoryData {
  name: string;
  description: string;
  slug: string;
  icon?: string;
}
```

## 👤 User API

### GET /api/auth/user

**Description**: Get current authenticated user information

**Method**: `GET`

**Authentication**: Required

**Response**:
```typescript
interface UserResponse {
  success: true;
  user: {
    id: string;
    email: string;
    name: string;
    avatar: string;
    bio: string;
    createdAt: string;
    workflowCount: number;
    totalViews: number;
    totalDownloads: number;
  };
}
```

### POST /api/auth/sync

**Description**: Sync StackAuth user data to local database

**Method**: `POST`

**Authentication**: Required

**Response**:
```json
{
  "success": true,
  "message": "User synchronized successfully"
}
```

## 🧪 Debug & Testing APIs

### GET /api/debug-env

**Description**: Get environment configuration (development only)

**Method**: `GET`

**Response**:
```json
{
  "NODE_ENV": "development",
  "CLOUDFLARE_D1_DATABASE_ID_DEV": "3f5e54bf-b024-43ac-9061-cd14bb018101",
  "CLOUDFLARE_D1_DATABASE_ID_PROD": "101bf744-d0ac-4832-b6b2-e56eabbebe31",
  "CLOUDFLARE_ACCOUNT_ID": "091539408595ba99a0ef106d42391d5b",
  "isDevelopment": true,
  "expectedDatabaseId": "3f5e54bf-b024-43ac-9061-cd14bb018101"
}
```

### GET /api/test-db

**Description**: Test database connectivity

**Method**: `GET`

**Response**:
```json
{
  "success": true,
  "message": "Database connection successful",
  "userCount": 5,
  "firstUser": {
    "id": "user-123",
    "email": "test@example.com",
    "name": "Test User"
  }
}
```

### POST /api/test-workflow

**Description**: Create a test workflow for development

**Method**: `POST`

**Content-Type**: `multipart/form-data`

**Form Fields**:
- `title`: Workflow title
- `description`: Workflow description
- `jsonContent`: N8N JSON (optional)

## 📊 Error Handling

### HTTP Status Codes

| Code | Description | When Used |
|------|-------------|-----------|
| 200 | OK | Successful GET, PUT requests |
| 201 | Created | Successful POST requests |
| 400 | Bad Request | Invalid request data, validation errors |
| 401 | Unauthorized | Authentication required |
| 403 | Forbidden | Insufficient permissions |
| 404 | Not Found | Resource doesn't exist |
| 409 | Conflict | Duplicate resource creation |
| 422 | Unprocessable Entity | Valid JSON but invalid data |
| 500 | Internal Server Error | System errors |

### Error Response Examples

#### Validation Error (400)
```json
{
  "success": false,
  "error": "Title is required",
  "statusCode": 400,
  "details": {
    "field": "title",
    "message": "Title cannot be empty"
  }
}
```

#### Authentication Error (401)
```json
{
  "success": false,
  "error": "Authentication required",
  "statusCode": 401
}
```

#### Permission Error (403)
```json
{
  "success": false,
  "error": "Access denied. You can only edit your own workflows.",
  "statusCode": 403
}
```

#### Not Found Error (404)
```json
{
  "success": false,
  "error": "Workflow not found",
  "statusCode": 404
}
```

#### Server Error (500)
```json
{
  "success": false,
  "error": "Internal server error",
  "statusCode": 500,
  "details": "Database connection failed"
}
```

## 🔒 Rate Limiting

### Current Limits
- **Public endpoints**: 100 requests per minute per IP
- **Authenticated endpoints**: 200 requests per minute per user
- **Upload endpoints**: 10 requests per minute per user

### Rate Limit Headers
```http
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1625097600
```

## 📱 Client Examples

### JavaScript/TypeScript

#### Fetch Workflows
```typescript
interface WorkflowsQueryParams {
  search?: string;
  category?: string;
  price?: 'free' | 'paid' | 'all';
  sort?: 'newest' | 'oldest' | 'popular' | 'downloads';
  page?: number;
  limit?: number;
}

async function fetchWorkflows(params: WorkflowsQueryParams = {}) {
  const searchParams = new URLSearchParams();
  
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined) {
      searchParams.append(key, value.toString());
    }
  });

  const response = await fetch(`/api/workflows?${searchParams}`, {
    credentials: 'include' // Include cookies for authentication
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return await response.json();
}

// Usage
const workflows = await fetchWorkflows({
  search: 'automation',
  category: 'marketing',
  price: 'free',
  page: 1,
  limit: 12
});
```

#### Create Workflow
```typescript
async function createWorkflow(workflowData: CreateWorkflowData) {
  const formData = new FormData();
  
  Object.entries(workflowData).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      formData.append(key, typeof value === 'object' ? JSON.stringify(value) : value.toString());
    }
  });

  const response = await fetch('/api/workflows', {
    method: 'POST',
    body: formData,
    credentials: 'include'
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to create workflow');
  }

  return await response.json();
}
```

### curl Examples

#### Get Workflows
```bash
curl -X GET "http://localhost:3001/api/workflows?search=automation&category=marketing&limit=5" \
  -H "Content-Type: application/json"
```

#### Create Workflow
```bash
curl -X POST "http://localhost:3001/api/workflows" \
  -F "title=Test Workflow" \
  -F "description=A test workflow" \
  -F "jsonContent={\"nodes\":[],\"connections\":[]}" \
  -F "isPaid=false" \
  -F "isPrivate=false" \
  -F "userId=user-123"
```

#### Get Specific Workflow
```bash
curl -X GET "http://localhost:3001/api/workflows/workflow-123" \
  -H "Content-Type: application/json"
```

## 🔄 Webhooks (Planned)

### Workflow Events
Future webhook support for:
- `workflow.created`
- `workflow.updated`
- `workflow.downloaded`
- `workflow.purchased`

### Webhook Payload
```typescript
interface WebhookPayload {
  event: string;
  data: any;
  timestamp: string;
  signature: string;
}
```

## 📈 API Analytics

### Metrics Tracked
- Request count by endpoint
- Response times
- Error rates
- Authentication success/failure rates
- Most popular endpoints

### Performance Monitoring
- Average response time: < 200ms
- 99th percentile response time: < 1000ms
- Error rate: < 1%
- Uptime: > 99.9%

---

This API documentation provides comprehensive information for integrating with the wrkflow platform. For frontend implementation details, see the [Frontend Architecture](./06-frontend-architecture.md) documentation.
